import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(id: string, farm: UpdateFarmDto): Promise<UpdateResult> {
    try {
      return await this.farmRepository.update(id, farm)
    } catch (error) {
      throw new Error('Error updating farm')
    }
  }
}
