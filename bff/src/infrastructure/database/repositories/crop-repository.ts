import { CropEntity } from '@infrastructure/database/entities/crop.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class CropRepository extends Repository<CropEntity> {
  constructor(private crop: DataSource) {
    super(CropEntity, crop.createEntityManager())
  }
}
