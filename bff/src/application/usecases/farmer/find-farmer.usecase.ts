import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable } from '@nestjs/common'
import { FarmerRelations } from '@infrastructure/config/relations-config/farmer-relations-config'

@Injectable()
export class FindFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}
  async execute(id?: string): Promise<FarmerProps | FarmerProps[]> {
    try {
      if (id) {
        return await this.farmerRepository.findOne({
          where: { id },
          relations: FarmerRelations,
        })
      }

      return await this.farmerRepository.find({
        relations: FarmerRelations,
      })
    } catch (error) {
      throw error
    }
  }
}
