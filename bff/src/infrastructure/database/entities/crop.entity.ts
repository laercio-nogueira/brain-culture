import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { HarvestEntity } from './harvest.entity'

const isTest = process.env.NODE_ENV === 'test'

@Entity('crop')
export class CropEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @Column({ nullable: true })
  harvestId: string

  @ManyToOne(() => HarvestEntity, harvest => harvest.crops)
  harvest: HarvestEntity

  @Column({
    nullable: false,
    type: isTest ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
