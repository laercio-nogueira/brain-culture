import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteHarvestUseCase {
  constructor(private harvestRepository: HarvestRepository) {}
  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.harvestRepository.delete(id)
      return {
        message: 'Harvest deleted successfully',
      }
    } catch (error) {
      throw error
    }
  }
}
