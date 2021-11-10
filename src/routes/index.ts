import { Router } from 'express'
// import auth from './auth'

const routes = Router()

// routes.use('/auth', auth)

routes.get('/healt', (req, res) => {
  console.log('app is working')
  res.send('app is working')
})

export default routes
