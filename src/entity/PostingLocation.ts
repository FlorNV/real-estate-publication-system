import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BaseEntity } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class PostingLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    address: string

  @Column()
    zone: string

  @Column()
    city: string

  @OneToOne(() => Posting, (posting) => posting.postingLocation)
    posting: Posting
}
