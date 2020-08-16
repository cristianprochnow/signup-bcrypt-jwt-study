import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { dbConnection } from '../database/connection'
import { hashPassword } from '../utils/hashPassword'
interface IUserData {
  id: string
  username: string
  password: string
}
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
      console.log(error)

      return response.status(400).json({
        event: 'An error has ocorred while connecting... Please, try again later.'
      })
    }
  }

  async login (request: Request, response: Response) {
    const { username, password } = request.body

    try {
      const userResponseData = await dbConnection('users')
        .select('*')
        .where({
          username
        })

      const userFromDatabaseResponse: IUserData = userResponseData[0]

      const isCorrectPassword = await bcrypt.compare(
        password,
        userFromDatabaseResponse.password
      )

      if (isCorrectPassword) {
        const token = jwt.sign(
          {
            id: userFromDatabaseResponse.id,
            username: userFromDatabaseResponse.username
          },
          process.env.SECRET_KEY as string,
          {
            expiresIn: '1h'
          }
        )

        return response.status(200).json(token)
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)

      return response.status(400).json({
        event: 'Username or password may are incorrect...'
      })
    }
  }

  async tokenView (request: Request, response: Response) {
    const { token } = request.headers

    const dataFromToken = jwt.decode(token as string)

    return response.json(dataFromToken)
  }
}

export { UsersController }
