import { HarvestProps } from '@domain/entities/harvest.entity'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'
import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'

@Injectable()
export class FindHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async execute(id?: string): Promise<HarvestProps | HarvestProps[]> {
    try {
      if (id) {
        return await this.harvestRepository.findOne({
          where: { id },
          relations: HarvestRelations,
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
