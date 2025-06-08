import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class FarmerRepository extends Repository<FarmerEntity> {
  constructor(private farmer: DataSource) {
    super(FarmerEntity, farmer.createEntityManager())
  }

  async isDocumentExists(
    document: string,
    excludeId?: string,
  ): Promise<boolean> {
    const query = this.createQueryBuilder('farmer').where(
      'farmer.document = :document',
      { document },
    )

    if (excludeId) {
      query.andWhere('farmer.id != :excludeId', { excludeId })
    }

    const count = await query.getCount()
    return count > 0
  }

  async isIdExists(id: string): Promise<boolean> {
    const count = await this.count({ where: { id } })
    return count > 0
  }
}
