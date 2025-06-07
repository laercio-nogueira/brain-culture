import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class FarmerRepository extends Repository<FarmerEntity> {
  constructor(private farmer: DataSource) {
    super(FarmerEntity, farmer.createEntityManager())
  }

  async findByDocument(document): Promise<FarmerProps> {
    return this.findOne({ where: { document } })
  }
}
