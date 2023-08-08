import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { Posting } from './Posting'

@Entity()
export class PostingPicture extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ length: 200 })
    url: string

  @Column({ length: 255 })
    title: string

  @Column()
    public_id: string

  @ManyToOne(() => Posting, (posting) => posting.postingPictures)
    posting: Posting
}
