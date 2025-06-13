import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FarmEntity } from './farm.entity'

const isTest = process.env.NODE_ENV === 'test'

@Entity('farmer')
export class FarmerEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false, type: 'varchar' })
  document: string

  @Column({ nullable: false, type: 'varchar' })
  documentType: string

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @OneToMany(() => FarmEntity, farm => farm.farmer)
  farms: FarmEntity[]

  @Column({
    nullable: false,
    type: isTest ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
