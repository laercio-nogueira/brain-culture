import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { InternalServerErrorException } from '@nestjs/common'
import { UpdateResult } from 'typeorm'

describe('UpdateFarmerUseCase', () => {
  let useCase: UpdateFarmerUseCase
  let farmerRepository: Partial<FarmerRepository>

  beforeEach(() => {
    farmerRepository = {
      isDocumentExists: jest.fn(),
      update: jest.fn(),
    }
    useCase = new UpdateFarmerUseCase(farmerRepository as FarmerRepository)
  })

  it('should throw InternalServerErrorException if document exists', async () => {
    const id = '123'
    const updateDto: UpdateFarmerDto = {
      document: 'doc-123',
      name: 'Pedro',
      documentType: 'PF',
    }

    ;(farmerRepository.isDocumentExists as jest.Mock).mockResolvedValue(true)

    await expect(useCase.execute(id, updateDto)).rejects.toThrow(
      InternalServerErrorException,
    )
    expect(farmerRepository.isDocumentExists).toHaveBeenCalledWith(
      'doc-123',
      id,
    )
    expect(farmerRepository.update).not.toHaveBeenCalled()
  })

  it('should update farmer if document does not exist', async () => {
    const id = '123'
    const updateDto: UpdateFarmerDto = {
      document: 'doc-123',
      name: 'Marcelo',
      documentType: 'PF',
    }
    const updateResult: UpdateResult = { affected: 1, raw: {} } as UpdateResult

    ;(farmerRepository.isDocumentExists as jest.Mock).mockResolvedValue(false)
    ;(farmerRepository.update as jest.Mock).mockResolvedValue(updateResult)

    const result = await useCase.execute(id, updateDto)

    expect(farmerRepository.isDocumentExists).toHaveBeenCalledWith(
      'doc-123',
      id,
    )
    expect(farmerRepository.update).toHaveBeenCalledWith(id, updateDto)
    expect(result).toEqual(updateResult)
  })

  it('should propagate errors from repository', async () => {
    const id = '123'
    const updateDto: UpdateFarmerDto = {
      document: 'doc-123',
      name: 'Jose',
      documentType: 'PF',
    }
    const error = new Error('DB error')

    ;(farmerRepository.isDocumentExists as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute(id, updateDto)).rejects.toThrow(error)
  })
})
