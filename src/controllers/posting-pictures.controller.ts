import { type Request, type Response } from 'express'
import { Posting, PostingPicture } from '../entity'

interface PostingPicturesBody {
  pictures: Array<{
    url: string
    title: string }>
}

interface PostingPictureBody {
  url: string
  title: string
}

interface Params {
  id: string
  pictureId: string
}

export const createPostingPicture = async (req: Request<Params, null, PostingPicturesBody>, res: Response) => {
  const { id } = req.params
  const { pictures } = req.body
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        postingPictures: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const pictureList = await Promise.all(
      pictures.map(async (picture) => {
        const postingPicture = new PostingPicture()
        postingPicture.url = picture.url
        postingPicture.title = picture.title
        postingPicture.public_id = picture.title

        await postingPicture.save()

        return postingPicture
      })
    )

    posting.postingPictures = [...posting.postingPictures, ...pictureList]

    await posting.save()

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePostingPicture = async (req: Request<Params, null, PostingPictureBody>, res: Response) => {
  const { id, pictureId } = req.params
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        postingPictures: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const pictureFound = posting.postingPictures.find(picture => picture.id === parseInt(pictureId))
    if (!pictureFound) {
      return res.status(404).json({
        message: 'picture not found'
      })
    }

    pictureFound.url = req.body.url
    pictureFound.title = req.body.title

    await pictureFound.save()

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const deletePostingPicture = async (req: Request<Params, null, null>, res: Response) => {
  const { id, pictureId } = req.params
  try {
    const posting = await Posting.findOne({
      where: { id: parseInt(id) },
      relations: {
        postingPictures: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const pictureFound = posting.postingPictures.find(picture => picture.id === parseInt(pictureId))
    if (!pictureFound) {
      return res.status(404).json({
        message: 'picture not found'
      })
    }

    await pictureFound.remove()

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
