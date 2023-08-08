import { type Request, type Response } from 'express'
import { type OperationTypeName } from '../types'
import { OperationType } from '../entity'

interface OperationTypeBody {
  name: OperationTypeName
}

export const getOpeartionTypes = async (req: Request, res: Response) => {
  try {
    const operationTypes = await OperationType.find()
    return res.status(200).json(operationTypes)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const getOpeartionType = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const operationType = await OperationType.findOneBy({ id: parseInt(id) })
    if (!operationType) {
      return res.status(404).json({
        message: 'operation type not found'
      })
    }

    return res.status(200).json(operationType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const createOperationType = async (req: Request<null, null, OperationTypeBody>, res: Response) => {
  const { name } = req.body
  try {
    if (!name) {
      return res.status(400).json({
        message: 'operation type name is required.'
      })
    }

    const operationType = new OperationType()
    operationType.name = name

    await operationType.save()

    return res.status(201).json(operationType)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'operation type can only have the values ​​RENT, SALE or TEMPORARY_RENTAL'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'operation type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updateOperationType = async (req: Request<{ id: string }, null, OperationTypeBody>, res: Response) => {
  const { id } = req.params
  try {
    const operationType = await OperationType.findOneBy({ id: parseInt(id) })

    if (!operationType) {
      return res.status(404).json({
        message: 'operation type not found'
      })
    }

    await OperationType.update({ id: parseInt(id) }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'operation type can only have the values ​​RENT, SALE or TEMPORARY_RENTAL'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'operation type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deleteOperationType = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const result = await OperationType.delete({ id: parseInt(id) })

    if (result.affected === 0) {
      return res.status(404).json({
        message: 'operation type not found'
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
