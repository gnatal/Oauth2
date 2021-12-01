import bcrypt from 'bcrypt'
import { User } from '../entities/user'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { hashIt } from '../utils/password'
import { SessionCreateService } from '../services/Session/create'

interface CreateUserRequest {
  email: string
  password: string
}

export default class UserController {
  async create(req: Request<{}, {}, CreateUserRequest>, res: Response) {
    try {
      const { email, password } = req.body
      const user = new User()
      const userRepository = getRepository(User)
      user.email = email
      user.password = hashIt(password)
      const session = await SessionCreateService.execute();
      user.session = session;
      await userRepository.save(user)
      console.log('user', user)
      return res.json(user)
    } catch (err) {
      console.log('err', err)
    }
  }
}
