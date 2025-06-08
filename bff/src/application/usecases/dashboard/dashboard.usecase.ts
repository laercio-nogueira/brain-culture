import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DashboardUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async data(): Promise<any> {
    try {
      const totalAreasResult = await this.farmRepository.getTotalAreas()
      const totalFarmByStateResult = await this.farmRepository.getFarmByState()
      const totalCropByFarmResult = await this.farmRepository.getFarmByCrops()

      return {
        ...totalAreasResult,
        farmByState: totalFarmByStateResult,
        cropByFarm: totalCropByFarmResult,
      }
    } catch (error) {
      throw new Error('Error fetching data from the database')
    }
  }
}
