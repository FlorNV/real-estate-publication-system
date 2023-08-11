import { type Request, type Response } from 'express'
import { type PropertyTypeName } from '../types'
import { PropertyType } from '../entity'

interface PropertyTypeBody {
  name: PropertyTypeName
}

export const getPropertyTypes = async (req: Request, res: Response) => {
  try {
    const propertyTypes = await PropertyType.find()
    return res.status(200).json(propertyTypes)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const getPropertyType = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const propertyType = await PropertyType.findOneBy({ id: parseInt(id) })
    if (!propertyType) {
      return res.status(404).json({
        message: 'property type not found'
      })
    }

    return res.status(200).json(propertyType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const createPropertyType = async (req: Request<null, null, PropertyTypeBody>, res: Response) => {
  const { name } = req.body
  try {
    if (!name) {
      return res.status(400).json({
        message: 'property type name is required.'
      })
    }

    const propertyType = new PropertyType()
    propertyType.name = name

    await propertyType.save()

    return res.status(201).json(propertyType)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'property type can only have the values APARTMENT, HOUSE or PH.'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'property type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePropertyType = async (req: Request<{ id: string }, null, PropertyTypeBody>, res: Response) => {
  const { id } = req.params
  try {
    const propertyType = await PropertyType.findOneBy({ id: parseInt(id) })

    if (!propertyType) {
      return res.status(404).json({
        message: 'property type not found'
      })
    }

    await PropertyType.update({ id: parseInt(id) }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(500).json({
          message: 'property type can only have the values APARTMENT, HOUSE or PH.'
        })
      }

      if (error.message.includes('duplicate key')) {
        return res.status(500).json({
          message: 'property type already exists'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deletePropertyType = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const result = await PropertyType.delete({ id: parseInt(id) })

    if (result.affected === 0) {
      return res.status(404).json({
        message: 'property type not found'
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
