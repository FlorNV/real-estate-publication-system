import { Router } from 'express'
import {
  createPosting,
  deletePosting,
  getPosting,
  getPostings,
  updatePosting,
  updatePostingStatus
} from '../controllers/posting.controller'
import { updatePostingPrices } from '../controllers/posting-prices.controller'
import { updatePostingPicture, deletePostingPicture, createPostingPicture } from '../controllers/posting-pictures.controller'
import { updatePostingLocation } from '../controllers/operation-location.controller'

const router = Router()

router.get('/postings', getPostings)
router.get('/postings/:id', getPosting)
router.post('/postings', createPosting)
router.put('/postings/:id', updatePosting)
router.patch('/postings/:id/status', updatePostingStatus)
router.delete('/postings/:id', deletePosting)

router.put('/postings/:id/location', updatePostingLocation)
router.put('/postings/:id/prices', updatePostingPrices)
router.post('/postings/:id/pictures', createPostingPicture)
router.put('/postings/:id/pictures/:pictureId', updatePostingPicture)
router.delete('/postings/:id/pictures/:pictureId', deletePostingPicture)

export default router
