import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async execute(id: string, harvest: UpdateHarvestDto): Promise<UpdateResult> {
    try {
      return await this.harvestRepository.update(id, harvest)
    } catch (error) {
      throw error
    }
  }
}
