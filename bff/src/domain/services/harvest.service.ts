import { Injectable } from '@nestjs/common'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'
import { CreateHarvestUseCase } from '@application/usecases/harvest/create-harvest.usecase'
import { FindHarvestUseCase } from '@application/usecases/harvest/find-harvest.usecase'
import { DeleteHarvestUseCase } from '@application/usecases/harvest/delete-harvest.usecase'
import { UpdateHarvestUseCase } from '@application/usecases/harvest/update-harvest.usecase'

@Injectable()
export class HarvestService {
  constructor(
    private readonly createHarvestUseCase: CreateHarvestUseCase,
    private readonly findHarvestUseCase: FindHarvestUseCase,
    private readonly deleteHarvestUseCase: DeleteHarvestUseCase,
    private readonly updateHarvestUseCase: UpdateHarvestUseCase,
  ) {}

  async create(harvest: CreateHarvestDto) {
    return await this.createHarvestUseCase.execute(harvest)
  }

  async findAll() {
    return await this.findHarvestUseCase.findAll()
  }

  async findOne(id: string) {
    return await this.findHarvestUseCase.findOne(id)
  }

  async update(id: string, harvest: UpdateHarvestDto) {
    return await this.updateHarvestUseCase.execute(id, harvest)
  }

  async remove(id: string) {
    return await this.deleteHarvestUseCase.execute(id)
  }
}
