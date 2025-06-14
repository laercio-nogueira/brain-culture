import { Injectable } from '@nestjs/common'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { FarmerProps } from '@domain/entities/farmer.entity'

@Injectable()
export class FarmerService {
  constructor(
    private readonly createFarmerUseCase: CreateFarmerUseCase,
    private readonly findFarmerUseCase: FindFarmerUseCase,
    private readonly deleteFarmerUseCase: DeleteFarmerUseCase,
    private readonly updateFarmerUseCase: UpdateFarmerUseCase,
  ) {}
  async create(farmer: CreateFarmerDto) {
    return await this.createFarmerUseCase.execute(farmer)
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: FarmerProps[]
    total: number
    page: number
    limit: number
  }> {
    return await this.findFarmerUseCase.findAll(page, limit)
  }

  async findOne(id: string) {
    return await this.findFarmerUseCase.findOne(id)
  }

  async update(id: string, farmer: UpdateFarmerDto) {
    return await this.updateFarmerUseCase.execute(id, farmer)
  }

  async remove(id: string) {
    return await this.deleteFarmerUseCase.execute(id)
  }
}
