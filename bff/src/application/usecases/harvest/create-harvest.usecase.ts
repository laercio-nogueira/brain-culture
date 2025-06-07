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
      if (!harvest.farmId) {
        return await this.harvestRepository.save(harvest)
      }

      const harvestData = await this.getFarmId(harvest)
      return await this.harvestRepository.save(harvestData)
    } catch (error) {
      throw error
    }
  }

  async getFarmId(harvest: CreateHarvestDto): Promise<CreateHarvestDto> {
    try {
      if (!isUUID(harvest.farmId)) {
        throw new NotFoundException(`Farm with ID ${harvest.farmId} not found`)
      }

      const farm = await this.farmRepository.findOneOrFail({
        where: { id: harvest.farmId },
      })

      if (!farm) {
        throw new NotFoundException(
          `Farmer with ID ${harvest.farmId} not found`,
        )
      }

      return await this.harvestRepository.create({
        ...harvest,
        farm,
      })
    } catch (error) {
      throw error
    }
  }
}
