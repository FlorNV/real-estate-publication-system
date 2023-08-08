import { Router } from 'express'
import {
  deleteRealEstateType,
  getRealEstateType,
  getRealEstateTypes,
  createRealEstateType,
  updateRealEstateType
} from '../controllers/real-estate-type.controller'

const router = Router()

router.get('/real-estate-types', getRealEstateTypes)
router.get('/real-estate-types/:id', getRealEstateType)
router.post('/real-estate-types', createRealEstateType)
router.put('/real-estate-types/:id', updateRealEstateType)
router.delete('/real-estate-types/:id', deleteRealEstateType)

export default router
