import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class DeleteFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.farmerRepository.delete({ id })
      return {
        message: 'Farmer deleted successfully',
      }
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error deleting farmer',
      )
    }
  }
}
