import { Router } from 'express'
// import auth from './auth'
import { hashIt } from '../utils/password'
import UserController from '../controllers/userController'
import { AuthController } from '../controllers/authController'
import ClientController from '../controllers/clientController'
import ScopeController from '../controllers/scopeController'

const userController = new UserController()
const authController = new AuthController()
const clientController = new ClientController()
const scopeController = new ScopeController()
const routes = Router()

routes.post('/auth', authController.login)
routes.get('/logout', authController.logout)
routes.post('/access_token', authController.validateAuthcodeSPA)

routes.post('/client',clientController.create);
routes.post('/scope',scopeController.create);

routes.get('/healt', (req, res) => {
  console.log('app is working')
  res.send('app is working')
})

routes.get('/tokenHealth', authController.tokenAuthentication)


routes.post('/user', userController.create)

export default routes
