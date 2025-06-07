import { FarmProps } from '@domain/entities/farm.entity'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute(id?: string): Promise<FarmProps | FarmProps[]> {
    try {
      if (id) {
        return await this.farmRepository.findOne({
          where: { id },
          relations: this.getRelations(),
        })
      }

      return await this.farmRepository.find({
        relations: this.getRelations(),
      })
    } catch (error) {
      throw new Error('Error finding farm')
    }
  }

  getRelations(): any {
    return {
      harvests: {
        crops: true,
      },
    }
  }
}
