import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CropProps } from '@domain/entities/crop.entity'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { isUUID } from 'class-validator'

@Injectable()
export class CreateCropUseCase {
  constructor(
    private cropRepository: CropRepository,
    private harvestRepository: HarvestRepository,
  ) {}

  async execute(crop: CreateCropDto): Promise<CropProps> {
    try {
      if (!crop.harvestId) {
        return await this.harvestRepository.save(crop)
      }

      const cropData = await this.getHarvestId(crop)
      return await this.cropRepository.save(cropData)
    } catch (error) {
      throw new Error('Error creating crop')
    }
  }

  async getHarvestId(crop: CreateCropDto): Promise<CreateCropDto> {
    try {
      if (!isUUID(crop.harvestId)) {
        throw new NotFoundException(
          `Harvest with ID ${crop.harvestId} not found`,
        )
      }

      const harvest = await this.harvestRepository.findOneOrFail({
        where: { id: crop.harvestId },
      })

      if (!harvest) {
        throw new NotFoundException(
          `Harvest with ID ${crop.harvestId} not found`,
        )
      }

      return await this.cropRepository.create({
        ...crop,
        harvest,
      })
    } catch (error) {
      throw error
    }
  }
}
