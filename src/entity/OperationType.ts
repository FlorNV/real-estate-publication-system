import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm'
import { Posting } from './Posting'
import { type OperationTypeName } from '../types'

@Entity()
export class OperationType extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    type: 'enum',
    enum: ['RENT', 'SALE', 'TEMPORARY_RENTAL'],
    unique: true
  })
    name: OperationTypeName

  @OneToMany(() => Posting, (posting) => posting.operationType)
    postings: Posting[]
}
