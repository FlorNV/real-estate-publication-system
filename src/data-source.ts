import { DataSource } from 'typeorm'
import {
  OperationType,
  Posting,
  PostingLocation,
  PostingPicture,
  PostingPrices,
  PropertyType,
  User
} from './entity/index'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'real-estate-publication-system-db',
  synchronize: true,
  entities: [
    OperationType,
    Posting,
    PostingLocation,
    PostingPicture,
    PostingPrices,
    PropertyType,
    User
  ]
})
