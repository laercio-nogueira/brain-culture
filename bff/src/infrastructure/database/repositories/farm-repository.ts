import { FarmEntity } from '@infrastructure/database/entities/farm.entity'
import { Injectable } from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class FarmRepository extends Repository<FarmEntity> {
  constructor(private farm: DataSource) {
    super(FarmEntity, farm.createEntityManager())
  }

  async getTotalAreas(): Promise<any> {
    const totalArea = this.farm
      .createQueryBuilder(FarmEntity, 'farm')
      .select([
        'COUNT(farm.id) AS totalFarms',
        'SUM(farm.totalArea) AS totalArea',
        'SUM(farm.cultivatedArea) AS totalCultivatedArea',
        'SUM(farm.vegetatedArea) AS totalVegetatedArea',
      ])
      .getRawOne()

    return totalArea
  }

  async getFarmByState(): Promise<any> {
    const farmByState = this.farm
      .createQueryBuilder(FarmEntity, 'farm')
      .select('UPPER(farm.state)', 'state')
      .addSelect('COUNT(farm.id)::integer', 'count')
      .groupBy('UPPER(farm.state)')
      .getRawMany()

    return farmByState
  }

  async getFarmByCrops(): Promise<any> {
    const farmByCrop = this.farm
      .createQueryBuilder(FarmEntity, 'farm')
      .innerJoin('farm.harvests', 'harvest')
      .innerJoin('harvest.crops', 'crop')
      .select('crop.name', 'cropName')
      .addSelect('COUNT(DISTINCT farm.id)', 'farmCount')
      .groupBy('crop.name')
      .orderBy('COUNT(DISTINCT farm.id)', 'DESC')
      .getRawMany()
      .then(result =>
        result.map(item => ({
          cropName: item.cropName,
          farmCount: parseInt(item.farmCount),
        })),
      )

    return farmByCrop
  }
}
