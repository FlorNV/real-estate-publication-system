import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm'
import { type PropertyTypeName } from '../types'
import { Posting } from './Posting'
import { PROPERTY_TYPE } from '../utils/constants'

@Entity()
export class PropertyType extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    type: 'enum',
    enum: PROPERTY_TYPE,
    unique: true
  })
    name: PropertyTypeName

  @OneToMany(() => Posting, (posting) => posting.propertyType)
    postings: Posting[]
}
