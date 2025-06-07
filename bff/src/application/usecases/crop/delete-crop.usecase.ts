import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteCropUseCase {
  constructor(private cropRepository: CropRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      await this.cropRepository.delete(id)
      return {
        message: 'Crop deleted successfully',
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
