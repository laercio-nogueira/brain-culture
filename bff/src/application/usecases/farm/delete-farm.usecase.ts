import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.farmRepository.delete(id)
      return {
        message: 'Farm deleted successfully',
      }
    } catch (error) {
      throw new Error('Error deleting farm')
    }
  }
}
