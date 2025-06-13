import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FarmerEntity } from './farmer.entity'
import { HarvestEntity } from './harvest.entity'

const isTest = process.env.NODE_ENV === 'test'

@Entity('farm')
export class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  city: string

  @Column({ nullable: false })
  state: string

  @Column({ nullable: false, type: 'integer' })
  totalArea: number

  @Column({ nullable: false, type: 'integer' })
  cultivatedArea: number

  @Column({ nullable: false, type: 'integer' })
  vegetatedArea: number

  @ManyToOne(() => FarmerEntity, farmer => farmer.farms)
  farmer: FarmerEntity

  @Column({
    nullable: true,
  })
  farmerId: string

  @OneToMany(() => HarvestEntity, harvest => harvest.farm)
  harvests: HarvestEntity[]

  @Column({
    nullable: false,
    type: isTest ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
