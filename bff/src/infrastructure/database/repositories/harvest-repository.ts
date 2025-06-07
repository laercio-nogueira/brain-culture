import { HarvestEntity } from '@infrastructure/database/entities/harvest.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class HarvestRepository extends Repository<HarvestEntity> {
  constructor(private harvest: DataSource) {
    super(HarvestEntity, harvest.createEntityManager())
  }
}
