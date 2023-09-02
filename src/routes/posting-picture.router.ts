import { Router } from 'express'
import {
  updatePostingPicture,
  deletePostingPicture,
  createPostingPictures
} from '../controllers/posting-pictures.controller'
import { uploadMiddleware } from '../middlewares/multer-middlewares'

const router = Router()

router.post('/pictures', uploadMiddleware, createPostingPictures)
router.put('/pictures/:id', uploadMiddleware, updatePostingPicture)
router.delete('/pictures/:id', deletePostingPicture)

export default router
