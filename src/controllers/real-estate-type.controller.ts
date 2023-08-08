import { type Request, type Response } from 'express'
import { type RealEstateTypeName } from '../types'
import { RealEstateType } from '../entity'

interface RealEstateTypeBody {
  name: RealEstateTypeName
}

export const getRealEstateTypes = async (req: Request, res: Response) => {
  try {
    const realEstateTypes = await RealEstateType.find()
    return res.status(200).json(realEstateTypes)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const getRealEstateType = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const realEstateType = await RealEstateType.findOneBy({ id: parseInt(id) })
    if (!realEstateType) {
      return res.status(404).json({
        message: 'real estate type not found'
      })
    }

    return res.status(200).json(realEstateType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const createRealEstateType = async (req: Request<null, null, RealEstateTypeBody>, res: Response) => {
  const { name } = req.body
  try {
    if (!name) {
      return res.status(400).json({
        message: 'real estate type name is required.'
      })
    }

    const realEstateType = new RealEstateType()
    realEstateType.name = name

    await realEstateType.save()

    return res.status(201).json(realEstateType)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'real estate type can only have the values APARTMENT, HOUSE or PH.'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'real estate type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updateRealEstateType = async (req: Request<{ id: string }, null, RealEstateTypeBody>, res: Response) => {
  const { id } = req.params
  try {
    const realEstateType = await RealEstateType.findOneBy({ id: parseInt(id) })

    if (!realEstateType) {
      return res.status(404).json({
        message: 'real estate type not found'
      })
    }

    await RealEstateType.update({ id: parseInt(id) }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'real estate type can only have the values APARTMENT, HOUSE or PH.'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'real estate type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deleteRealEstateType = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const result = await RealEstateType.delete({ id: parseInt(id) })

    if (result.affected === 0) {
      return res.status(404).json({
        message: 'real estate type not found'
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
