import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}
  async execute(id?: string): Promise<FarmerProps | FarmerProps[]> {
    try {
      if (id) {
        return await this.farmerRepository.findOne({
          where: { id },
          relations: this.getRelations(),
        })
      }

      return await this.farmerRepository.find({
        relations: this.getRelations(),
      })
    } catch (error) {
      throw error
    }
  }

  getRelations(): any {
    return {
      farms: {
        harvests: {
          crops: true,
        },
      },
    }
  }
}
