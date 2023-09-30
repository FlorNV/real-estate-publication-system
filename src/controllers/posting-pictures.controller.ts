import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express'
import { Posting, PostingPicture } from '../entity'

interface PostingPictureBody {
  title: string
  postingId: number
}

interface Params extends ParamsDictionary {
  id: string
  // pictureId: string
}

interface TypedRequest<U extends ParamsDictionary, T> extends Request {
  params: U
  body: T
}

// req: TypedRequest<{ id: string }, PostingPicturesBody>

export const createPostingPictures = async (req: Request, res: Response) => {
  // const { id } = req.params
  const { url, title, postingId } = req.body
  try {
    const posting = await Posting.findOne({
      where: { id: postingId },
      relations: {
        postingPictures: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const postingPicture = new PostingPicture()
    postingPicture.title = title
    postingPicture.url = url

    await postingPicture.save()

    // Agregar al array de fotos
    posting.postingPictures.push(postingPicture)

    await posting.save()

    return res.status(201).json(posting)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export const updatePostingPicture = async (req: Request, res: Response) => {
  const { id } = req.params
  const { url, title, postingId } = req.body
  try {
    const posting = await Posting.findOne({
      where: { id: postingId },
      relations: {
        postingPictures: true
      }
    })
    if (!posting) {
      return res.status(404).json({
        message: 'posting not found'
      })
    }

    const pictureFound = posting.postingPictures.find(picture => picture.id === parseInt(id))
    if (!pictureFound) {
      return res.status(404).json({
        message: 'picture not found'
      })
    }

    pictureFound.url = url
    pictureFound.title = title

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

export const deletePostingPicture = async (req: Request, res: Response) => {
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
