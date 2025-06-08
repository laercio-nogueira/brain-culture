import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { HarvestProps } from '@domain/entities/harvest.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { isUUID } from 'class-validator'

@Injectable()
export class CreateHarvestUseCase {
  constructor(
    private harvestRepository: HarvestRepository,
    private farmRepository: FarmRepository,
  ) {}

  async execute(harvest: CreateHarvestDto): Promise<HarvestProps> {
    try {
      return await this.harvestRepository.save(harvest)
    } catch (error) {
      throw error
    }
  }
}
