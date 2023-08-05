import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PostingPicture {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ length: 200 })
    url: string

  @Column({ length: 255 })
    title: string

  @Column()
    public_id: string
}
