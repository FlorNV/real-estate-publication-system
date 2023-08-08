import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity } from 'typeorm'
import { User } from './User'

@Entity()
export class Seeker extends BaseEntity {
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
