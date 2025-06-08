import { ForeingKeyConstraintException } from '@application/exceptions/foreign-key-constraint.exception'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable } from '@nestjs/common'

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
      throw new ForeingKeyConstraintException(
        error,
        'Produtor não pode ser deletado pois possui fazenda(s) relacionada(s).',
      )
    }
  }
}
