import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class PostingLocation {
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
