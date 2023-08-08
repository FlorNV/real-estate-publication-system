import { Router } from 'express'
import {
  deleteOperationType,
  getOpeartionType,
  getOpeartionTypes,
  createOperationType,
  updateOperationType
} from '../controllers/operation-type.controller'

const router = Router()

router.get('/operation-types', getOpeartionTypes)
router.get('/operation-types/:id', getOpeartionType)
router.post('/operation-types', createOperationType)
router.put('/operation-types/:id', updateOperationType)
router.delete('/operation-types/:id', deleteOperationType)

export default router
