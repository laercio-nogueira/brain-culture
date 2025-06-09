import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'
import { FarmRelations } from '@infrastructure/config/relations-config/farm-relations-config'

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

  async findAll(): Promise<FarmProps[]> {
    try {
      return await this.farmRepository.find({
        relations: FarmRelations,
      })
    } catch (error) {
      throw new Error('Error finding farm')
    }
  }
}
