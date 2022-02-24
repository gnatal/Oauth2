import { User } from '../../entities/user'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { hashIt } from '../../utils/password'
import { SessionCreateService } from '../../services/Session/create'
import CreateUserService from '../../services/User/create'

interface CreateUserRequest {
  email: string
  password: string
}


export default class UserController {
  async create(req: Request<{}, {}, CreateUserRequest>, res: Response) {
    try {
      const { email, password } = req.body
      const user = CreateUserService.execute(email, password);
      console.log('user', user)
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
