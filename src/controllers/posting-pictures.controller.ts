import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express'
import { Posting, PostingPicture } from '../entity'
import { promises as fs } from 'fs'
import cloudinaryModule from 'cloudinary'
const cloudinary = cloudinaryModule.v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

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

export const createPostingPictures = async (req: Request<null, null, PostingPictureBody, null>, res: Response) => {
  // const { id } = req.params
  const { title, postingId } = req.body
  const file = req.file
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

    if (!file) {
      return res.status(400).json({
        message: 'send picture and title'
      })
    }

    const result = await cloudinary.uploader.upload(file.path)

    if (!result) {
      await fs.unlink(file.path)
      return res.status(400).json({
        message: 'could not upload the picture'
      })
    }

    const postingPicture = new PostingPicture()
    postingPicture.title = title
    postingPicture.url = result.url
    postingPicture.public_id = result.public_id

    await postingPicture.save()
    await fs.unlink(file.path)

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

export const updatePostingPicture = async (req: Request<Params, null, PostingPictureBody, null>, res: Response) => {
  const { id } = req.params
  const { title, postingId } = req.body
  const file = req.file
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

    if (file) {
      await cloudinary.uploader.destroy(pictureFound.public_id)
      const result = await cloudinary.uploader.upload(file.path)
      pictureFound.url = result.url
      pictureFound.public_id = result.public_id

      await fs.unlink(file.path)
    }

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

export const deletePostingPicture = async (req: Request<Params, null, null, null>, res: Response) => {
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

    await cloudinary.uploader.destroy(pictureFound.public_id)
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
