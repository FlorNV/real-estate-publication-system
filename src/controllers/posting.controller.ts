import { type Request, type Response } from 'express'
import { type PostingStatus, type PublicationPlan } from '../types'
import { Posting } from '../entity'

interface PostingBody {
  publishDate: Date
  publicationPlan: PublicationPlan
  postingStatus: PostingStatus
  title: string
  postingSlug: string
  postingDescription: string
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
        realEstateType: true
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

export const getPosting = async (req: Request, res: Response) => {
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
        realEstateType: true
      }
    })
    if (posting) {
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
  try {
    return res.status(201).json({ message: 'posting created' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePosting = async (req: Request<{ id: string }, null, PostingBody>, res: Response) => {
  const { id } = req.params
  try {
    const posting = await Posting.findOneBy({ id: parseInt(id) })

    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    await Posting.update({ id: parseInt(id) }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
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
