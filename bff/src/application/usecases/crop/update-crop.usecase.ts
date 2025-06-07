import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateCropUseCase {
  constructor(private cropRepository: CropRepository) {}

  async execute(id: string, crop: UpdateCropDto): Promise<UpdateResult> {
    try {
      return await this.cropRepository.update(id, crop)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
