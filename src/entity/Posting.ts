import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { OperationType, PostingPrices, PostingLocation, Publisher } from './index'

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    postingType: string

  @Column()
    publicationPlan: string

  @Column()
    publishDate: Date

  @Column()
    postingStatus: string

  @Column()
    title: string

  @Column()
    postinSlug: string

  @Column({ type: 'text' })
    postinDescription: string

  @Column()
    reserved: boolean

  @OneToOne(() => OperationType)
  @JoinColumn()
    operationType: OperationType

  @OneToOne(() => PostingPrices)
  @JoinColumn()
    postingPrices: PostingPrices

  @OneToOne(() => PostingLocation)
  @JoinColumn()
    postingLocation: PostingLocation

  @ManyToOne(() => Publisher, (publisher) => publisher.postings)
    publisher: Publisher
}
