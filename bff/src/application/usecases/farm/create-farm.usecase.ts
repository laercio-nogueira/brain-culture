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
      if (!farm.farmerId) {
        return await this.farmRepository.save(farm)
      }

      const farmData = await this.getFarmerId(farm)
      return await this.farmRepository.save(farmData)
    } catch (error) {
      throw error
    }
  }

  async getFarmerId(farm: CreateFarmDto): Promise<CreateFarmDto> {
    if (!isUUID(farm.farmerId)) {
      throw new NotFoundException(`Farmer with ID ${farm.farmerId} not found`)
    }

    const farmer = await this.farmerRepository.findOneOrFail({
      where: { id: farm.farmerId },
    })

    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${farm.farmerId} not found`)
    }

    return await this.farmRepository.create({
      ...farm,
      farmer,
    })
  }
}
