import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

class UsersMiddleware {
  async index (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { token } = request.headers

    try {
      const isValidToken = jwt.verify(
          token as string,
          process.env.SECRET_KEY as string
      )

      if (isValidToken) {
        next()
      } else {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({
        event: 'Invalid token.'
      })
    }
  }
}

export { UsersMiddleware }
