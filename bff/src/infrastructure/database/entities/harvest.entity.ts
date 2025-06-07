import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FarmerEntity } from './farmer.entity'
import { FarmEntity } from './farm.entity'
import { CropEntity } from './crop.entity'

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

  @OneToMany(() => CropEntity, crop => crop.harvest)
  crops?: CropEntity[]

  @Column({
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
