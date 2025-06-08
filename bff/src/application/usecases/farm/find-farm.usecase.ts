import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'
import { FarmRelations } from '@infrastructure/config/relations-config/farm-relations-config'

@Injectable()
export class FindFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(id?: string): Promise<FarmProps | FarmProps[]> {
    try {
      if (id) {
        return await this.farmRepository.findOne({
          where: { id },
          relations: FarmRelations,
        })
      }

      return await this.farmRepository.find({
        relations: FarmRelations,
      })
    } catch (error) {
      throw new Error('Error finding farm')
    }
  }
}
