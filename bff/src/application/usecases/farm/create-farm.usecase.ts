import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(farm: CreateFarmDto): Promise<FarmProps> {
    try {
      return await this.farmRepository.save(farm)
    } catch (error) {
      throw error
    }
  }
}
