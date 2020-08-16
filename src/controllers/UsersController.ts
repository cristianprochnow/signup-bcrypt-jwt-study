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

    console.log({
      userUuid,
      username,
      password,
      hashedPassword
    })

    try {
      const listOfUsersWithSameUsername = await dbConnection('users')
        .select('id')
        .where({ username })

      if (listOfUsersWithSameUsername[0]) {
        return response.status(400).json({
          event: 'This username already exists...'
        })
      }

      const registerResponse = await dbConnection('users').insert({
        id: userUuid,
        username,
        password: hashedPassword
      })

      if (registerResponse) {
        return response.status(201).json({
          event: 'User registered successfully!'
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

export { UsersController }
