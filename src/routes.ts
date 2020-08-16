import { Router } from 'express'

import { UsersController } from './controllers/UsersController'

const routes = Router()

const usersController = new UsersController()

routes.get('/users', usersController.index)
routes.post('/users/signup', usersController.store)
routes.post('/users/login', usersController.login)

export { routes }
