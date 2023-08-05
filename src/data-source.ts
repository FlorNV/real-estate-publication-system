import { DataSource } from 'typeorm'
import {
  Customer,
  OperationType,
  Posting,
  PostingLocation,
  PostingPicture,
  PostingPrices,
  Publisher,
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
    Customer,
    OperationType,
    Posting,
    PostingLocation,
    PostingPicture,
    PostingPrices,
    Publisher,
    User
  ]
})
