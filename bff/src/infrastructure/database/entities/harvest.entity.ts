import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FarmEntity } from './farm.entity'
import { CropEntity } from './crop.entity'

const isTest = process.env.NODE_ENV === 'test'

@Entity('harvest')
export class HarvestEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @Column({ nullable: false })
  year: number

  @ManyToOne(() => FarmEntity, farm => farm.harvests)
  farm: FarmEntity

  @Column({ nullable: true })
  farmId?: string | null

  @OneToMany(() => CropEntity, crop => crop.harvest)
  crops?: CropEntity[]

  @Column({
    nullable: false,
    type: isTest ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
