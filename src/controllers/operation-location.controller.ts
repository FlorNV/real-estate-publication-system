import { type Request, type Response } from 'express'
import { Posting, PostingLocation } from '../entity'

interface PostingLocationBody {
  address: string
  zone: string
  city: string
}

export const updatePostingLocation = async (req: Request<{ id: string }, null, PostingLocationBody>, res: Response) => {
  const { id } = req.params
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        postingLocation: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    await PostingLocation.update({ id: posting.postingLocation.id }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
