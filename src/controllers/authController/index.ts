import sha256 from 'crypto-js/sha256';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../entities/session';
import { User } from '../../entities/user';
import { ExtractTokenFromHeadersService } from '../../services/Auth/extractToken';
import CheckClientIdentityService from '../../services/clientService/checkClientIdentity';
import { SessionCreateService } from '../../services/Session/create';
import { SessionCreateTokenService } from '../../services/Session/createTokens';
import { decode, IJwtPayload } from '../../utils/jwt';
import { compareIt } from '../../utils/password';
import { authenticatePKCE } from '../../utils/pkce';
import { IErrorUnauthorized } from '../../utils/error';
import { Client } from '../../entities/client';
import clientWithScopesService from '../../services/clientService/getClientWithScopes';
import { SessionRefreshTokenService } from '../../services/Session/refreshToken';
import { SessionDestroiService } from '../../services/Session/delete';

interface IAuthController {
  email: string
  password: string
  pkce_hash: string
}

interface IClientGrant {
  user_id: string;
  client_id: string;
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
      if (user.checkPassord(password)) {
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
      const session = await sessionRepository.findOneOrFail({where:{authCode: authCode, pkceHash: pkce}, relations: ["user"]})
      // if(authenticatePKCE(pkce, session.pkceHash)){
      // }
      if(session.authCodeUsed) {
        return res.status(401).json({message: "authCode already used"});
      }
      SessionCreateTokenService.execute(session,client_id,user_id)
      return res.status(200).json({ session })
    }catch(e){
      console.log(e)
      return res.status(500).json({message:"error"})
    }
  }

  async validateAuthcodeServer(req: Request<{},{},any>, res: Response){
    try{
      const {authCode, pkce, client_secret, client_id } = req.body;''
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

  async consentGranted(req: Request<{}, {}, IClientGrant>, res: Response){
    try{
      const {client_id, user_id} = req.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail({id: user_id});
      const clientRepository = getRepository(Client);
      const client = await clientRepository.findOneOrFail({id: client_id, relations: ["users"]});
      client.users = [...client.users, user];
      clientRepository.save(client);
      return res.status(200).json({message: "consent granted"});
    }catch(e){
      console.log('ERROR CONSENT GRANTED',e);
      return res.status(500).json({message:"consent failed"})
    }
  }
  
  async consentRemove(req: Request<{}, {}, IClientGrant>, res: Response){
    try{
      const {client_id, user_id} = req.body;
      const clientRepository = getRepository(Client);
      const client = await clientRepository.findOneOrFail({id: client_id, relations: ["users"]});
      client.users = client.users.filter(u => u.id !== user_id);
      clientRepository.save(client);
      return res.status(200).json({message: "consent remove success"});
    }catch(e){
      console.log('ERROR CONSENT GRANTED',e);
      return res.status(500).json({message:"consent failed"})
    }
  }

  async tokenCheck(req: Request<{}, {}, IJwtPayload>, res: Response){
    try {
        console.log('token check', req.body);
        const token = ExtractTokenFromHeadersService.execute(req);
        const payload = decode(token);
        return res.status(200).json({ payload });
    } catch(e) {
      if(e instanceof IErrorUnauthorized){
        return res.status(401).json({message: e.message});
      }
      return res.status(500).json({message:"error"})
    }
  }

  async getClientFromToken(req: Request<{}, {}, IJwtPayload>, res: Response){
    try {
        const token = ExtractTokenFromHeadersService.execute(req);
        const payload = decode(token);
        const client = await clientWithScopesService.execute((payload.clientId as string));
        return res.status(200).json({ client });
    } catch(e) {
      console.log(e)
      return res.status(500).json({message:"error"})
    }
  }

  async refreshToken(req: Request<{}, {}, IJwtPayload>, res: Response){
    const token = ExtractTokenFromHeadersService.execute(req);
    try {
      const payload = decode(token);
      const session = await SessionRefreshTokenService.execute(token);
      return res.status(200).json({ session });
  } catch(e) {
    console.log(e)
    if(e instanceof IErrorUnauthorized){
      if(e.message === "Token expired"){
        await SessionDestroiService.execute(token);
        return res.status(401).json({message: e.message});
      }
    }
    return res.status(500).json({message:"error"})
  }

  }

  async logout(req: Request<{}, {}, {}>, res: Response){
    try{
      const token = ExtractTokenFromHeadersService.execute(req)
      const sessionRepository = getRepository(Session);
      const session = await sessionRepository.findOneOrFail({token: token});
      sessionRepository.delete(session);
      return res.status(200).json({message: "logout success", session});
    }catch(e){
      console.log('ERROR LOGINT OUT',e);
      return res.status(500).json({message:"logout failed"})
    }
  }

}
