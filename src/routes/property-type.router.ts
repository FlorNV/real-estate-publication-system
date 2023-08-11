import { Router } from 'express'
import { createPropertyType, deletePropertyType, getPropertyType, getPropertyTypes, updatePropertyType } from '../controllers/property-type.controller'

const router = Router()

router.get('/property-types', getPropertyTypes)
router.get('/property-types/:id', getPropertyType)
router.post('/property-types', createPropertyType)
router.put('/property-types/:id', updatePropertyType)
router.delete('/property-types/:id', deletePropertyType)

export default router
