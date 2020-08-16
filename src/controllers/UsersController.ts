import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { dbConnection } from '../database/connection'
import { hashPassword } from '../utils/hashPassword'

class UsersController {
  async index (request: Request, response: Response) {
    const usersList = await dbConnection('users').select('*')

    return response.json(usersList)
  }

  async store (request: Request, response: Response) {
    const { username, password } = request.body
    const userUuid = uuidv4()

    const hashedPassword = await hashPassword(password)

    try {
      const registerResponse = await dbConnection('users').insert({
        id: userUuid,
        username,
        password: hashedPassword
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
