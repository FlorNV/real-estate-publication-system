import dotenv from 'dotenv'
import 'reflect-metadata'
import app from './app'
import { AppDataSource } from './data-source'

dotenv.config()
const port = process.env.PORT ?? 3000

// Start the server
async function main () {
  try {
    await AppDataSource.initialize()
    console.log('Database connected')
    app.listen(port, () => { console.log(`Server on port ${port}`) })
  } catch (error) {
    console.error(error)
    throw new Error('Could not connect to database')
  }
}

main()
