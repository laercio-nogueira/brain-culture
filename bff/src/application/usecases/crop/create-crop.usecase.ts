import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { Injectable } from '@nestjs/common'
import { CropProps } from '@domain/entities/crop.entity'

@Injectable()
export class CreateCropUseCase {
  constructor(private cropRepository: CropRepository) {}

  async execute(crop: CreateCropDto): Promise<CropProps> {
    try {
      return await this.cropRepository.save(crop)
    } catch (error) {
      throw new Error('Error creating crop')
    }
  }
}
