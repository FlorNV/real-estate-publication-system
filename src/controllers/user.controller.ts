import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { type UserRole } from '../types'
import { User } from '../entity'

const jwtSecret = process.env.JWT_SECRET as string
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string
const refreshTokens: Array<string | undefined> = []

interface UserBody {
  email: string
  password: string
  phoneNumber: string
  role: UserRole
  realEstateName?: string
  description?: string
  lastName?: string
  firstName?: string
}

const createToken = (user: User) => {
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '20m' })
  const refreshToken = jwt.sign({ email: user.email }, jwtRefreshTokenSecret, { expiresIn: '90d' })

  refreshTokens.push(refreshToken)
  return {
    token,
    refreshToken
  }
}

export const refresh = async (req: Request, res: Response): Promise<any> => {
  const refreshToken = req.body.refresh
  if (!refreshToken) {
    return res.status(401).json({
      errors: [{ message: 'Token not found' }]
    })
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      errors: [{ message: 'Invalid refresh token' }]
    })
  }

  try {
    const user = jwt.verify(refreshToken, jwtRefreshTokenSecret)
    const { email } = user as any
    const userFound = await User.findOneBy({ email }) as User
    if (!userFound) {
      return res.status(400).json({
        message: 'The user does not exist'
      })
    }

    const accessToken = jwt.sign({ id: userFound.id, email: userFound.email }, jwtSecret, { expiresIn: '60s' })

    res.json({ accessToken })
  } catch (error) {
    res.status(403).json({
      errors: [{ message: 'Invalid token' }]
    })
  }
}

const comparePassword = async (user: User, password: string): Promise<boolean> => {
  return await bcrypt.compare(password, user.password)
}

const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findOneBy({ id: parseInt(id) })
    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      })
    }

    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const signUp = async (req: Request<null, null, UserBody>, res: Response) => {
  const { email, password, phoneNumber, role } = req.body
  try {
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({
        message: 'send your email, password and phone number.'
      })
    }

    const userFound = await User.findOneBy({ email })
    if (userFound) {
      return res.status(404).json({
        message: 'the user already exists'
      })
    }

    const user = new User()
    user.email = email
    user.password = await createHash(password)
    user.phoneNumber = phoneNumber
    user.role = role

    if (role === 'PUBLISHER') {
      const { realEstateName, description } = req.body
      if (!realEstateName || !description) {
        return res.status(400).json({
          message: 'send name and description.'
        })
      }

      user.realEstateName = realEstateName
      user.description = description
    } else {
      const { firstName, lastName } = req.body
      if (!firstName || !lastName) {
        return res.status(400).json({
          message: 'send your first name and last name.'
        })
      }

      user.firstName = firstName
      user.lastName = lastName
    }

    await user.save()

    const { password: pass, ...data } = user

    return res.status(201).json(data)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(400).json({
          message: 'role can only have the values PUBLISHER or SEEKER.'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Send email and password'
    })
  }

  const user = await User.createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOne()
  if (!user) {
    return res.status(400).json({
      message: 'The user does not exists'
    })
  }

  const isMatch = await comparePassword(user, password)
  if (!isMatch) {
    return res.status(400).json({
      message: 'Credentials are incorrect'
    })
  }

  return res.status(400).json({
    credentials: createToken(user)
  })
}

export const updateUser = async (req: Request<{ id: string }, null, UserBody>, res: Response) => {
  const { id } = req.params
  const { email } = req.body
  try {
    const user = await User.findOneBy({ id: parseInt(id) })

    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      })
    }

    const userFound = await User.findOneBy({ email })
    if (userFound) {
      return res.status(404).json({
        message: 'the user already exists'
      })
    }

    await User.update({ id: parseInt(id) }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(400).json({
          message: 'role can only have the values PUBLISHER or SEEKER.'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deleteUser = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const result = await User.delete({ id: parseInt(id) })

    if (result.affected === 0) {
      return res.status(404).json({
        message: 'user not found'
      })
    }

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
