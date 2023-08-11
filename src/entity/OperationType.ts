import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm'
import { Posting } from './Posting'
import { type OperationTypeName } from '../types'
import { OPERATION_TYPE } from '../utils/constants'

@Entity()
export class OperationType extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    type: 'enum',
    enum: OPERATION_TYPE,
    unique: true
  })
    name: OperationTypeName

  @OneToMany(() => Posting, (posting) => posting.operationType)
    postings: Posting[]
}
