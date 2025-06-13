import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'
import { FarmRelations } from '@infrastructure/config/relations-config/farm-relations-config'
import { FindFarmDto } from '@application/dto/farm/find-farm.dto'

@Injectable()
export class FindFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async findOne(id?: string): Promise<FarmProps> {
    try {
      return await this.farmRepository.findOne({
        where: { id },
      })
    } catch (error) {
      throw new Error('Error finding farm')
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: FarmProps[]
    total: number
    page: number
    limit: number
  }> {
    const skip = (page - 1) * limit

    try {
      const [farms, total] = await this.farmRepository.findAndCount({
        relations: FarmRelations,
        skip,
        take: limit,
      })

      return {
        data: farms,
        total,
        page,
        limit,
      }
    } catch (error) {
      throw new Error('Error finding farm')
    }
  }
}
