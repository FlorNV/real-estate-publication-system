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
import {
  updatePostingPicture,
  deletePostingPicture,
  createPostingPictures
} from '../controllers/posting-pictures.controller'
import { updatePostingLocation } from '../controllers/operation-location.controller'
import { verifyAuthorization, verifyToken } from '../middlewares/validateToken'

const router = Router()

router.get('/postings', getPostings)
router.get('/postings/:id', getPosting)
router.post('/postings', verifyToken, verifyAuthorization('PUBLISHER'), createPosting)
router.put('/postings/:id', verifyToken, verifyAuthorization('PUBLISHER'), updatePosting)
router.patch('/postings/:id/status', verifyToken, verifyAuthorization('PUBLISHER'), updatePostingStatus)
router.delete('/postings/:id', verifyToken, verifyAuthorization('PUBLISHER'), deletePosting)

router.put('/postings/:id/location', verifyToken, verifyAuthorization('PUBLISHER'), updatePostingLocation)
router.put('/postings/:id/prices', verifyToken, verifyAuthorization('PUBLISHER'), updatePostingPrices)
router.post('/postings/:id/pictures', verifyToken, verifyAuthorization('PUBLISHER'), createPostingPictures)
router.put('/postings/:id/pictures/:pictureId', verifyToken, verifyAuthorization('PUBLISHER'), updatePostingPicture)
router.delete('/postings/:id/pictures/:pictureId', verifyToken, verifyAuthorization('PUBLISHER'), deletePostingPicture)

export default router
