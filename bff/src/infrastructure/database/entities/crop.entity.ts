import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { HarvestEntity } from './harvest.entity'

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
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
