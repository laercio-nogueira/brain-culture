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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: FindFarmerDto[]
    total: number
    page: number
    limit: number
  }> {
    const skip = (page - 1) * limit

    try {
      const [farmers, total] = await this.farmerRepository.findAndCount({
        relations: FarmerRelations,
        skip,
        take: limit,
      })

      const data = FindFarmerDto.useMask(farmers)

      return {
        data,
        total,
        page,
        limit,
      }
    } catch (error) {
      throw error
    }
  }
}
