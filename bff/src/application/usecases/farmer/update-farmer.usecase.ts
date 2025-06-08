import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { InternalServerErrorException, Injectable } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

@Injectable()
export class UpdateFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}

  async execute(id: string, farmer: UpdateFarmerDto): Promise<UpdateResult> {
    try {
      const documentExists = await this.farmerRepository.isDocumentExists(
        farmer.document,
        id,
      )

      if (documentExists) {
        throw new InternalServerErrorException(
          'Já existe outro produtor com este documento',
        )
      }

      return await this.farmerRepository.update(id, farmer)
    } catch (error) {
      throw error
    }
  }
}
