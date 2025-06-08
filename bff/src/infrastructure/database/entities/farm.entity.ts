import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FarmerEntity } from './farmer.entity'
import { HarvestEntity } from './harvest.entity'

@Entity('farm')
export class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ nullable: false, type: 'varchar' })
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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date
}
