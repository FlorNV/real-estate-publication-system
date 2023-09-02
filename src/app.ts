import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import multer from 'multer'
// import path from 'path'

import userRouter from './routes/user.router'
import operationTypeRouter from './routes/operation-type.router'
import propertyTypeRouter from './routes/property-type.router'
import postingRouter from './routes/posting.router'
// import { uploadMultipleMiddleware, uploadSingleMiddleware } from './middlewares/multer-middlewares'

// Initializations
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/v1/', userRouter)
app.use('/api/v1/', operationTypeRouter)
app.use('/api/v1/', propertyTypeRouter)
app.use('/api/v1/', postingRouter)

export default app
