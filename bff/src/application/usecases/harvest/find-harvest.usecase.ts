import { HarvestProps } from '@domain/entities/harvest.entity'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'
import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'
import { FindHarvestDto } from '@application/dto/harvest/find-harvest.dto'

@Injectable()
export class FindHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async execute(id?: string): Promise<FindHarvestDto | FindHarvestDto[]> {
    try {
      if (id) {
        return await this.harvestRepository.findOne({
          where: { id },
        })
      }

      return await this.harvestRepository.find({
        relations: HarvestRelations,
      })
    } catch (error) {
      throw error
    }
  }
}
