import { User } from '../../entities/user'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { hashIt } from '../../utils/password'
import { SessionCreateService } from '../../services/Session/create'
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
}
