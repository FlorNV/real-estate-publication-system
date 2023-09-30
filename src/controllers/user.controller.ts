import { type Request, type Response } from 'express'
import { type UserRole } from '../types'
import { User } from '../entity'

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
    user.password = password
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

    return res.status(201).json(user)
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
  res.send('login')
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
