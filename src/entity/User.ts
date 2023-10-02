import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm'
import { Posting } from './Posting'
import { type UserRole } from '../types'
import { ROLES } from '../utils/constants'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    email: string

  @Column({ select: false })
    password: string

  @Column()
    phoneNumber: string

  @Column({
    type: 'enum',
    enum: ROLES,
    default: 'SEEKER'
  })
    role: UserRole

  @Column({ nullable: true })
    lastName: string

  @Column({ nullable: true })
    firstName: string

  @Column({ nullable: true })
    realEstateName: string

  @Column({ nullable: true })
    description: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updateAt: Date

  @OneToMany(() => Posting, (posting) => posting.publisher)
    postings: Posting[]
}
