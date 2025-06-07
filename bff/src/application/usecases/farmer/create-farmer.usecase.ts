import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { FarmerProps } from '@domain/entities/farmer.entity'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class CreateFarmerUseCase {
  constructor(private farmerRepository: FarmerRepository) {}
  async execute(farmer: CreateFarmerDto): Promise<FarmerProps> {
    try {
      await this.verifyFarmerExist(farmer.document)
      return await this.farmerRepository.save(farmer)
    } catch (error) {
      throw error
    }
  }

  async verifyFarmerExist(document: string): Promise<void> {
    const res = await this.farmerRepository.findByDocument(document)
    if (res)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Farmer already exists',
        },
        HttpStatus.CONFLICT,
      )
  }
}
