import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../entity'
import { type UserRole } from '../types'

const jwtSecret = process.env.JWT_SECRET as string

declare module 'express' {
  interface Request {
    userId?: string
  }
}

interface Decode {
  id: string
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'token not provided'
      })
    }

    const { id } = jwt.verify(token, jwtSecret) as Decode
    req.userId = id
    next()
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: 'token is not valid'
    })
  }
}

export const verifyAuthorization = (requiredRole: UserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req

    if (!userId) {
      return res.status(401).json({
        status: 401,
        message: 'unauthorized access'
      })
    }

    const user = await User.findOneBy({ id: parseInt(userId) })
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'user not authenticated'
      })
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({
        status: 403,
        message: 'you are not alowed to do that'
      })
    }
    next()
  }
