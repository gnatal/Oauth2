import sha256 from 'crypto-js/sha256';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../entities/session';
import { User } from '../../entities/user';
import { ExtractTokenFromHeadersService } from '../../services/Auth/extractToken';
import CheckClientIdentityService from '../../services/clientService/checkClientIdentity';
import { SessionCreateService } from '../../services/Session/create';
import { SessionCreateTokenService } from '../../services/Session/createTokens';
import { decode } from '../../utils/jwt';
import { compareIt } from '../../utils/password';
import { authenticatePKCE } from '../../utils/pkce';
import { IErrorUnauthorized } from '../../utils/error';

interface IAuthController {
  email: string
  password: string
  pkce_hash: string
}
export class AuthController {


  async login(req: Request<{}, {}, IAuthController>, res: Response) {
    try {
      const { email, password, pkce_hash } = req.body
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({ where: { email }, relations: ["sessions"] })
      if (!user) {
        return res.status(401).json({ message: 'Login failed user not found' })
      }
      if (compareIt(password, user.password)) {
        const session = await SessionCreateService.execute(pkce_hash);
        user.sessions = [...user.sessions, session];
        userRepository.save(user);
        return res.status(200).json({ authCode: session.authCode, user: user })
      } else {
        return res.status(401).json({ message: 'Login failed password wrong' })
      }
    } catch (err) {
      console.log('err', err)
      return res.status(500).json({ message: 'Login failed server error' })
    }
  }

  async validateAuthcodeSPA(req: Request<{},{},any>, res: Response){
    try{
      const {authCode, pkce, client_id, user_id } = req.body;
      const sessionRepository = getRepository(Session);
      // const session = await sessionRepository.findOneOrFail({authCode: authCode, pkceHash: sha256(pkce).toString()})
      const session = await sessionRepository.findOneOrFail({authCode: authCode, pkceHash: pkce})
      // if(authenticatePKCE(pkce, session.pkceHash)){
      // }
      SessionCreateTokenService.execute(session,client_id,user_id)
      return res.status(200).json({ session })
    }catch(e){
      console.log(e)
      return res.status(500).json({message:"error"})
    }
  }

  async validateAuthcodeServer(req: Request<{},{},any>, res: Response){
    try{
      const {authCode, pkce, client_secret, client_id } = req.body;
      await CheckClientIdentityService.execute(client_id, client_secret);
      const sessionRepository = getRepository(Session);
      const session = await sessionRepository.findOneOrFail({authCode: authCode, pkceHash: sha256(pkce).toString()})
      if(authenticatePKCE(pkce, session.pkceHash)){
        SessionCreateTokenService.execute(session,client_id, "1")
      }
      return res.status(200).json({
        accessToken: session.token,
        refreshToken: session.refreshToken
      })
    }catch(e){
      console.log(e)
      return res.status(500).json({message:"error"})
    }
  }

  async consentGranted(req: Request<{}, {}, IAuthController>, res: Response){
    try{

    }catch(e){
      return res.status(500).json({message:"consent failed"})
    }
  }
  
  async tokenAuthentication(req: Request<{}, {}, {}>, res: Response){
    try{
      const token = ExtractTokenFromHeadersService.execute(req)
      const tokenValue = decode(token);
      return res.status(200).json({tokenValue});
    }catch(e){
      if( e instanceof IErrorUnauthorized)
        return res.status(e.status).json({message: e.message, error: e.error});
    }
    return res.status(400).json({error: "unknown error"});
  }

}
