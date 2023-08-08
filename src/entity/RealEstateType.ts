import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm'
import { type RealEstateTypeName } from '../types'
import { Posting } from './Posting'

@Entity()
export class RealEstateType extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    type: 'enum',
    enum: ['APARTMENT', 'HOUSE', 'PH'],
    unique: true
  })
    name: RealEstateTypeName

  @OneToMany(() => Posting, (posting) => posting.realEstateType)
    postings: Posting[]
}
