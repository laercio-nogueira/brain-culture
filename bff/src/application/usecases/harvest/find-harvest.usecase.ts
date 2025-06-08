import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'
import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'
import { FindHarvestDto } from '@application/dto/harvest/find-harvest.dto'

@Injectable()
export class FindHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async findOne(id?: string): Promise<FindHarvestDto> {
    try {
      return await this.harvestRepository.findOne({
        where: { id },
      })
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<FindHarvestDto[]> {
    try {
      return await this.harvestRepository.find({
        relations: HarvestRelations,
      })
    } catch (error) {
      throw error
    }
  }
}
