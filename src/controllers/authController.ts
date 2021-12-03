import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entities/user'
import { compareIt, hashIt } from '../utils/password'
import { compare } from 'bcrypt'

interface IAuthController {
  email: string
  password: string
}
export class AuthController {
  async login(req: Request<{}, {}, IAuthController>, res: Response) {
    try {
      const { email, password } = req.body
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ message: 'Login failed user not found' })
      }
      if (compareIt(password, user.password)) {
        const token = uuidv4()
        console.log('token', token)
        return res.status(200).json({ token })
      } else {
        return res.status(401).json({ message: 'Login failed password wrong' })
      }
    } catch (err) {
      console.log('err', err)
      return res.status(500).json({ message: 'Login failed server error' })
    }
  }

  async consentGranted(req: Request<{}, {}, IAuthController>, res: Response){
    try{

    }catch(e){
      return res.status(500).json({message:"consent failed"})
    }
  }
  
}
