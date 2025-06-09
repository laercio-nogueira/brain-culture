import { ForeingKeyConstraintException } from '@application/exceptions/foreign-key-constraint.exception'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.farmRepository.delete(id)
      return {
        message: 'Fazenda deletada com sucesso',
      }
    } catch (error) {
      throw new ForeingKeyConstraintException(
        error,
        'Fazenda não pode ser deletada pois possui safra(s) relacionadas(s)',
      )
    }
  }
}
