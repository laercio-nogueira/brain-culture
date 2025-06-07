import { Injectable } from '@nestjs/common'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { CreateCropUseCase } from '@application/usecases/crop/create-crop.usecase'
import { FindCropUseCase } from '@application/usecases/crop/find-crop.usecase'
import { DeleteCropUseCase } from '@application/usecases/crop/delete-crop.usecase'
import { UpdateCropUseCase } from '@application/usecases/crop/update-crop.usecase'
import { CropFindProps } from '@domain/entities/crop.entity'

@Injectable()
export class CropService {
  constructor(
    private readonly createCropUseCase: CreateCropUseCase,
    private readonly findCropCase: FindCropUseCase,
    private readonly deleteCropCase: DeleteCropUseCase,
    private readonly updateCropCase: UpdateCropUseCase,
  ) {}
  async create(crop: CreateCropDto) {
    return await this.createCropUseCase.execute(crop)
  }

  async findAll(): Promise<CropFindProps[]> {
    return await this.findCropCase.findAll()
  }

  async findOne(id: string): Promise<CropFindProps> {
    return await this.findCropCase.findOne(id)
  }

  async update(id: string, crop: UpdateCropDto) {
    return await this.updateCropCase.execute(id, crop)
  }

  async remove(id: string) {
    return await this.deleteCropCase.execute(id)
  }
}
