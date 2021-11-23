import { Router } from 'express'
// import auth from './auth'
import { hashIt } from '../utils/password'

const routes = Router()

routes.post('/auth', (req, res) => {
  const { username, password } = req.body
  res.send(hashIt(password))
})

routes.get('/healt', (req, res) => {
  console.log('app is working')
  res.send('app is working')
})

export default routes
