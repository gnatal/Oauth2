import { Router } from 'express'
// import auth from './auth'
import { hashIt } from '../utils/password'
import UserController from '../controllers/userController'
import { AuthController } from '../controllers/authController'
import ClientController from '../controllers/clientController'
import ScopeController from '../controllers/scopeController'
import { authenticateUser } from '../middlewares/auth'

const userController = new UserController()
const authController = new AuthController()
const clientController = new ClientController()
const scopeController = new ScopeController()
const routes = Router()

routes.post('/auth', authController.login)
routes.get('/logout', authenticateUser, authController.logout)
routes.post('/grant_access',authenticateUser, authController.consentGranted)
routes.put('/revoke_access',authenticateUser, authController.consentRemove)
routes.post('/access_token', authController.validateAuthcodeSPA)

routes.get('/validate_token', authController.tokenCheck)
routes.get('/client_token', authController.getClientFromToken)
routes.get('/refresh_token', authController.refreshToken)


routes.post('/client', authenticateUser ,clientController.create);
routes.post('/consent_grant', authenticateUser ,userController.grantConsent);
routes.post('/consent_revoke', authenticateUser ,userController.revokeConsent);
routes.post('/scope',scopeController.create);

routes.get('/healt', (req, res) => {
  console.log('app is working')
  res.send('app is working')
})

routes.post('/user', userController.create)

export default routes
