import { FarmEntity } from '@infrastructure/database/entities/farm.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class FarmRepository extends Repository<FarmEntity> {
  constructor(private farm: DataSource) {
    super(FarmEntity, farm.createEntityManager())
  }
}
