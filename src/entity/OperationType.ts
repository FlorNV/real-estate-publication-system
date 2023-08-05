import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class OperationType {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    operationTypeName: string

  @OneToOne(() => Posting, (posting) => posting.operationType)
    posting: Posting
}
