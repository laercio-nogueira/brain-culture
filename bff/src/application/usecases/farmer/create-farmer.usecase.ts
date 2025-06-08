import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class CreateFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}
  async execute(farmer: CreateFarmerDto): Promise<FarmerProps> {
    try {
      const documentExists = await this.farmerRepository.isDocumentExists(
        farmer.document,
      )

      if (documentExists) {
        throw new InternalServerErrorException(
          'Já existe outro produtor com este documento',
        )
      }

      return await this.farmerRepository.save(farmer)
    } catch (error) {
      throw error
    }
  }
}
