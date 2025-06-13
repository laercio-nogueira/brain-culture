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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    data: CropFindProps[]
    total: number
    page: number
    limit: number
  }> {
    const skip = (page - 1) * limit

    try {
      const [crops, total] = await this.cropRepository.findAndCount({
        skip,
        take: limit,
      })

      return {
        data: crops,
        total,
        page,
        limit,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
