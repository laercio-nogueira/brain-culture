import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { isUUID } from 'class-validator'

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private farmRepository: FarmRepository,
    private farmerRepository: FarmerRepository,
  ) {}

  async execute(farm: CreateFarmDto): Promise<FarmProps> {
    try {
      return await this.farmRepository.save(farm)
    } catch (error) {
      throw error
    }
  }
}
