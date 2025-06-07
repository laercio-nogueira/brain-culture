import { Injectable } from '@nestjs/common'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'
import { CreateFarmUseCase } from '@application/usecases/farm/create-farm.usecase'
import { FindFarmUseCase } from '@application/usecases/farm/find-farm.usecase'
import { DeleteFarmUseCase } from '@application/usecases/farm/delete-farm.usecase'
import { UpdateFarmUseCase } from '@application/usecases/farm/update-farm.usecase'

@Injectable()
export class FarmService {
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly findFarmUseCase: FindFarmUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
  ) {}

  async create(farm: CreateFarmDto) {
    return await this.createFarmUseCase.execute(farm)
  }

  async findAll() {
    return await this.findFarmUseCase.execute()
  }

  async findOne(id: string) {
    return await this.findFarmUseCase.execute(id)
  }

  async update(id: string, farm: UpdateFarmDto) {
    return await this.updateFarmUseCase.execute(id, farm)
  }

  async remove(id: string) {
    return await this.deleteFarmUseCase.execute(id)
  }
}
