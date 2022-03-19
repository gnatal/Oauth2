import { User } from '../../entities/user'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Client } from '../../entities/client'
import CreateUserService from '../../services/User/create'
import { CreateUserRequest } from './types'
export default class UserController {
  async create(req: Request<{}, {}, CreateUserRequest>, res: Response) {
    try {
      const { email, password } = req.body
      const user = await CreateUserService.execute(email, password);
      return res.json(user)
    } catch (err) {
      console.log('err', err)
    }
  }

  async info (req: Request<{}, {}, CreateUserRequest>, res: Response) {
    try {
      const { email } = req.body
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({email})
      return res.json(user)
    } catch (err) {
      console.log('err', err)
    }
  }

  async grantConsent (req: Request<{}, {}, any>, res: Response) {
    try{
      const { email, client_id } = req.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail({email});
      const clientRepository = getRepository(Client);
      const client = await clientRepository.findOneOrFail({where: {id: client_id}, relations: ['users']});
      client.users = [...client.users, user];
      await clientRepository.save(client);
      return res.json(client).status(200);
    }catch(e){
      console.log('ERROR GRANTING CONSENT', e);
      return res.status(500).json({e});
    }
  }

  async revokeConsent (req: Request<{}, {}, any>, res: Response) {
    try{
      const { email, client_id } = req.body;
      const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail({email});
      const clientRepository = getRepository(Client);
      const client = await clientRepository.findOneOrFail({where: {id: client_id}, relations: ['users']});
      client.users = client.users.filter(u => u.id !== user.id);
      await clientRepository.save(client);
      return res.json(client).status(200);
    }catch(e){
      return res.status(500).json({e});
    }
  }

}
