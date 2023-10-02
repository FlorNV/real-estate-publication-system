import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  signIn,
  signUp,
  updateUser
} from '../controllers/user.controller'
import { verifyToken } from '../middlewares/validateToken'

const router = Router()

router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUser)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)

export default router
