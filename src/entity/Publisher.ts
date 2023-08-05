import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { Posting, User } from './index'

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    description: string

  @OneToOne(() => User)
  @JoinColumn()
    user: User

  @OneToMany(() => Posting, (posting) => posting.publisher)
    postings: Posting[]
}
