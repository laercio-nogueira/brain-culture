import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'
import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'
import { FindHarvestDto } from '@application/dto/harvest/find-harvest.dto'

@Injectable()
export class FindHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async findOne(id?: string): Promise<FindHarvestDto> {
    try {
      return await this.harvestRepository.findOne({
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
    data: FindHarvestDto[]
    total: number
    page: number
    limit: number
  }> {
    const skip = (page - 1) * (limit ?? 10)

    try {
      const [harvest, total] = await this.harvestRepository.findAndCount({
        relations: HarvestRelations,
        ...(page && {
          skip,
          take: limit,
        }),
      })

      return {
        data: harvest,
        total,
        ...(page && {
          page,
          limit,
        }),
      }
    } catch (error) {
      throw error
    }
  }
}
