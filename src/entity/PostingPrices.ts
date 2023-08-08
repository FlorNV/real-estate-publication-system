import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BaseEntity } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class PostingPrices extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    priceAmount: number

  @Column()
    priceCurrency: string

  @Column()
    expensesAmount: number

  @Column()
    expensesCurrency: string

  @OneToOne(() => Posting, (posting) => posting.postingPrices)
    posting: Posting
}
