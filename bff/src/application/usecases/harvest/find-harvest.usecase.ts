import { HarvestProps } from '@domain/entities/harvest.entity'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async execute(id?: string): Promise<HarvestProps | HarvestProps[]> {
    try {
      if (id) {
        return await this.harvestRepository.findOne({
          where: { id },
          relations: this.getRelations(),
        })
      }

      return await this.harvestRepository.find({
        relations: this.getRelations(),
      })
    } catch (error) {
      throw error
    }
  }

  getRelations(): any {
    return {
      crops: true,
    }
  }
}
