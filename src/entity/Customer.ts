import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    lastName: string

  @Column()
    firstName: string

  @OneToOne(() => User)
  @JoinColumn()
    user: User
}
