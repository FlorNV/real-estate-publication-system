import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  signIn,
  signUp,
  updateUser
} from '../controllers/user.controller'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
