import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}

  async execute(id: string, farmer: UpdateFarmerDto): Promise<UpdateResult> {
    return await this.farmerRepository.update(id, farmer)
  }
}
