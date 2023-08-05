import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// Initializations
const app = express()

// Settings
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

export default app
