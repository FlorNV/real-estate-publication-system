import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class PostingPrices {
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
