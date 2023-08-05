import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Customer } from './Customer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column()
    phoneNumber: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updateAt: Date

  @OneToOne(() => Customer, (customer) => customer.user)
    customer: Customer
}
