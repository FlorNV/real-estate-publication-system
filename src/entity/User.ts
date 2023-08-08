import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { Publisher, Seeker } from './index'
import { type UserRole } from '../types'
import { ROLES } from '../constants'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column()
    phoneNumber: string

  @Column({
    type: 'enum',
    enum: ROLES,
    default: 'SEEKER'
  })
    role: UserRole

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updateAt: Date

  @OneToOne(() => Seeker, (seeker) => seeker.user)
    seeker: Seeker

  @OneToOne(() => Publisher, (publisher) => publisher.user)
    publisher: Publisher
}
