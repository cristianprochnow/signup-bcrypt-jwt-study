import { Router } from 'express'

import { UsersController } from './controllers/UsersController'
import { UsersMiddleware } from './middlewares/UsersMiddleware'

const routes = Router()

const usersController = new UsersController()
const usersMiddleware = new UsersMiddleware()

routes.get('/users', usersController.index)
routes.get('/users/private', usersMiddleware.index, usersController.tokenView)
routes.post('/users/signup', usersController.store)
routes.post('/users/login', usersController.login)

export { routes }
