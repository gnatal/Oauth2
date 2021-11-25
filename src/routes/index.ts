import { Router } from 'express'
// import auth from './auth'
import { hashIt } from '../utils/password'
import UserController from '../controllers/userController'
import { AuthController } from '../controllers/authController'

const userController = new UserController()
const authController = new AuthController()
const routes = Router()

routes.post('/auth', authController.login)

routes.get('/healt', (req, res) => {
  console.log('app is working')
  res.send('app is working')
})

routes.post('/user', userController.create)

export default routes
