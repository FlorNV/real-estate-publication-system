import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRouter from './routes/user.router'
import operationTypeRouter from './routes/operation-type.router'
import realEstateTypeRouter from './routes/real-estate-type.router'

// Initializations
const app = express()

// Settings
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/api/v1/', userRouter)
app.use('/api/v1/', operationTypeRouter)
app.use('/api/v1/', realEstateTypeRouter)

export default app
