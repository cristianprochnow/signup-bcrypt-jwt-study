import { Request, Response } from 'express'
import { dbConnection } from '../database/connection'

class UsersController {
  async index (request: Request, response: Response) {
    const usersList = await dbConnection('users').select('*')

    return response.json(usersList)
  }

  async store (request: Request, response: Response) {
    const { username, password } = request.body

    try {
      const registerResponse = await dbConnection('users').insert({
        username,
        password
      })

      if (registerResponse) {
        return response.status(201).send('User registered successfully!')
      } else {
        throw new Error('Ooops... Do not have been possible register this user.')
      }
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

export { UsersController }
