import { v4 as uuidv4 } from 'uuid'

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await this.authService.login(email, password)
    if (!user) {
      return res.status(401).json({ message: 'Login failed' })
    }
    return res.json(user)
  }
}
