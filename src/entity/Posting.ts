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
  PostingPicture,
  PropertyType,
  User
} from './index'
import { type PublicationPlan, type PostingStatus } from '../types'
import { POSTING_STATUS, PUBLICATION_PLAN } from '../utils/constants'

@Entity()
export class Posting extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @CreateDateColumn()
    publishDate: Date

  @Column({
    type: 'enum',
    enum: PUBLICATION_PLAN,
    default: 'SIMPLE'
  })
    publicationPlan: PublicationPlan

  @Column({
    type: 'enum',
    enum: POSTING_STATUS,
    default: 'AVAILABLE'
  })
    postingStatus: PostingStatus

  @Column()
    title: string

  @Column({ nullable: true })
    postingSlug: string

  @Column({ type: 'text' })
    postingDescription: string

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.postings)
    propertyType: PropertyType

  @ManyToOne(() => OperationType, (operationType) => operationType.postings)
    operationType: OperationType

  @OneToOne(() => PostingPrices)
  @JoinColumn()
    postingPrices: PostingPrices

  @OneToOne(() => PostingLocation)
  @JoinColumn()
    postingLocation: PostingLocation

  @ManyToOne(() => User, (publisher) => publisher.postings)
    publisher: User

  @OneToMany(() => PostingPicture, (postinPicture) => postinPicture.posting)
    postingPictures: PostingPicture[]
}
