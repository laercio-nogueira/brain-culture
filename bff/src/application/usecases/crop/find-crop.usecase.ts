import { CropFindProps } from '@domain/entities/crop.entity'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindCropUseCase {
  constructor(private cropRepository: CropRepository) {}

  async findOne(id?: string): Promise<CropFindProps> {
    try {
      return await this.cropRepository.findOne({
        where: { id },
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findAll(): Promise<CropFindProps[]> {
    try {
      return await this.cropRepository.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
