import { type Request, type Response } from 'express'
import { PostingPrices, Posting } from '../entity'

interface PostingPricesBody {
  priceAmount: number
  priceCurrency: string
  expensesAmount: number
  expensesCurrency: string
}

export const updatePostingPrices = async (req: Request<{ id: string }, null, PostingPricesBody>, res: Response) => {
  const { id } = req.params
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        postingPrices: true
      }
    })
    console.log(posting)
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    await PostingPrices.update({ id: posting.postingPrices.id }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
