import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
  CreateDateColumn
} from 'typeorm'
import {
  OperationType,
  PostingPrices,
  PostingLocation,
  Publisher,
  PostingPicture,
  RealEstateType
} from './index'
import { type PublicationPlan, type PostingStatus } from '../types'

@Entity()
export class Posting extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @CreateDateColumn()
    publishDate: Date

  @Column({
    type: 'enum',
    enum: ['SIMPLE', 'HIGHLIGHTED', 'SUPERHIGHLIGHTED'],
    default: 'SIMPLE'
  })
    publicationPlan: PublicationPlan

  @Column({
    type: 'enum',
    enum: ['AVAILABLE', 'RESERVED', 'FINALIZED'],
    default: 'AVAILABLE'
  })
    postingStatus: PostingStatus

  @Column()
    title: string

  @Column()
    postingSlug: string

  @Column({ type: 'text' })
    postingDescription: string

  @ManyToOne(() => RealEstateType, (realEstateType) => realEstateType.postings)
    realEstateType: RealEstateType

  @ManyToOne(() => OperationType, (operationType) => operationType.postings)
    operationType: OperationType

  @OneToOne(() => PostingPrices)
  @JoinColumn()
    postingPrices: PostingPrices

  @OneToOne(() => PostingLocation)
  @JoinColumn()
    postingLocation: PostingLocation

  @ManyToOne(() => Publisher, (publisher) => publisher.postings)
    publisher: Publisher

  @OneToMany(() => PostingPicture, (postinPicture) => postinPicture.posting)
    postingPictures: []
}
