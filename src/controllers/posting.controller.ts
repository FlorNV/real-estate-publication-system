import { type Request, type Response } from 'express'
import { type PostingStatus, type PublicationPlan } from '../types'
import { OperationType, Posting, PostingLocation, PostingPicture, PostingPrices, PropertyType, User } from '../entity'
import { createSlug } from '../utils/format'

interface PostingPricesType {
  priceAmount: number
  priceCurrency: string
  expensesAmount: number
  expensesCurrency: string
}

interface Picture {
  url: string
  title: string
}

interface PostingLocationType {
  address: string
  zone: string
  city: string
}

interface PostingBody {
  publicationPlan: PublicationPlan
  title: string
  postingDescription: string
  propertyType: number
  operationType: number
  postingPrices: PostingPricesType
  postingLocation: PostingLocationType
  publisher: number
  postingPictures: Picture[]
}

export const getPostings = async (req: Request, res: Response) => {
  try {
    const postings = await Posting.find({
      relations: {
        operationType: true,
        postingLocation: true,
        postingPictures: true,
        postingPrices: true,
        publisher: true,
        propertyType: true
      }
    })
    return res.status(200).json(postings)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const getPosting = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        operationType: true,
        postingLocation: true,
        postingPictures: true,
        postingPrices: true,
        publisher: true,
        propertyType: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    return res.status(200).json(posting)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const createPosting = async (req: Request<null, null, PostingBody>, res: Response) => {
  const { publicationPlan, title, postingDescription, propertyType, operationType, postingPrices, postingLocation, publisher, postingPictures } = req.body

  try {
    if (!title || !postingDescription || !propertyType || !operationType || !postingPrices || !postingLocation || !publisher || !postingPictures.length) {
      return res.status(400).json({
        message: 'title, description, property type, operation type, prices, location and publisher are required'
      })
    }

    const propertyTypeFound = await PropertyType.findOneBy({ id: propertyType })
    if (!propertyTypeFound) {
      return res.status(404).json({
        message: 'property type not found'
      })
    }

    const operationTypeFound = await OperationType.findOneBy({ id: operationType })
    if (!operationTypeFound) {
      return res.status(404).json({
        message: 'operation type not found'
      })
    }

    const publisherFound = await User.findOne({
      where: { id: publisher, role: 'PUBLISHER' }
    })
    if (!publisherFound) {
      return res.status(404).json({
        message: 'publisher not found'
      })
    }

    const { address, zone, city } = postingLocation
    if (!address || !zone || !city) {
      return res.status(400).json({
        message: 'address, zone and city are required'
      })
    }

    const { priceAmount, priceCurrency } = postingPrices
    if (!priceAmount || !priceCurrency) {
      return res.status(400).json({
        message: 'the price amount and the price currency are required'
      })
    }

    // Crear y guardar una localización
    const newPostingLocation = new PostingLocation()
    newPostingLocation.address = address
    newPostingLocation.zone = zone
    newPostingLocation.city = city

    await newPostingLocation.save()

    // Crear y guadar imagenes
    const picturesList = await Promise.all(
      postingPictures.map(async (picture) => {
        const postingPicture = new PostingPicture()
        postingPicture.url = picture.url
        postingPicture.title = picture.title

        await postingPicture.save()

        return postingPicture
      }))

    // Crear y guardar precios
    const newPostingPrices = new PostingPrices()
    newPostingPrices.priceAmount = postingPrices.priceAmount
    newPostingPrices.priceCurrency = postingPrices.priceCurrency
    newPostingPrices.expensesAmount = postingPrices.expensesAmount
    newPostingPrices.expensesCurrency = postingPrices.expensesCurrency

    await newPostingPrices.save()

    const posting = new Posting()
    posting.operationType = operationTypeFound
    posting.postingDescription = postingDescription
    posting.title = title
    posting.postingLocation = newPostingLocation
    posting.postingPictures = picturesList
    posting.postingPrices = newPostingPrices
    posting.propertyType = propertyTypeFound
    posting.publicationPlan = publicationPlan
    posting.publisher = publisherFound

    await posting.save()

    // Generar slug
    const slug = `${createSlug(title)}-${posting.id}`
    posting.postingSlug = slug

    await posting.save()

    return res.status(201).json(posting)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(400).json({
          message: 'publication plan can only have the values SIMPLE, HIGHLIGHTED or SUPERHIGHLIGHTED.'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePosting = async (req: Request<{ id: string }, null, PostingBody>, res: Response) => {
  const { id } = req.params
  const { publicationPlan, title, postingDescription, propertyType, operationType } = req.body
  try {
    const posting = await Posting.findOneBy({ id: parseInt(id) })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const propertyTypeFound = await PropertyType.findOneBy({ id: propertyType })
    if (!propertyTypeFound) {
      return res.status(404).json({
        message: 'property type not found'
      })
    }

    const operationTypeFound = await OperationType.findOneBy({ id: operationType })
    if (!operationTypeFound) {
      return res.status(404).json({
        message: 'operation type not found'
      })
    }

    // Generar slug
    const slug = `${createSlug(title)}-${posting.id}`

    const body = {
      publicationPlan,
      title,
      postingDescription,
      propertyType: propertyTypeFound,
      operationType: operationTypeFound,
      postingSlug: slug
    }

    await Posting.update({ id: parseInt(id) }, body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(400).json({
          message: 'publication plan can only have the values SIMPLE, HIGHLIGHTED or SUPERHIGHLIGHTED.'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePostingStatus = async (req: Request<{ id: string }, null, { postingStatus: PostingStatus }>, res: Response) => {
  const { id } = req.params
  const { postingStatus } = req.body
  try {
    const posting = await Posting.findOneBy({ id: parseInt(id) })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    await Posting.update({ id: parseInt(id) }, { postingStatus })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input value for enum')) {
        return res.status(400).json({
          message: 'posting status can only have the values AVAILABLE, RESERVED or FINALIZED.'
        })
      }

      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deletePosting = async (req: Request<{ id: string }, null, null>, res: Response) => {
  const { id } = req.params
  try {
    const result = await Posting.delete({ id: parseInt(id) })

    if (result.affected === 0) {
      return res.status(404).json({
        message: 'posting not found'
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
