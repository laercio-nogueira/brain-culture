import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable } from '@nestjs/common'
import { FarmerRelations } from '@infrastructure/config/relations-config/farmer-relations-config'
import { FindFarmerDto } from '@application/dto/farmer/find-farmer.dto'

@Injectable()
export class FindFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}
  async findOne(id?: string): Promise<FarmerProps> {
    try {
      return await this.farmerRepository.findOne({
        where: { id },
      })
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<FindFarmerDto[]> {
    try {
      const result = await this.farmerRepository.find({
        relations: FarmerRelations,
      })

      return FindFarmerDto.useMask(result)
    } catch (error) {
      throw error
    }
  }
}
