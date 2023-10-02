import { Router } from 'express'
import {
  updatePostingPicture,
  deletePostingPicture,
  createPostingPictures
} from '../controllers/posting-pictures.controller'

const router = Router()

router.post('/pictures', createPostingPictures)
router.put('/pictures/:id', updatePostingPicture)
router.delete('/pictures/:id', deletePostingPicture)

export default router
