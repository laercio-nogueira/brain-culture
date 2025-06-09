import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { InternalServerErrorException } from '@nestjs/common'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { FarmerProps } from '@domain/entities/farmer.entity'

const mockFarmerRepository = () => ({
  isDocumentExists: jest.fn(),
  save: jest.fn(),
})

describe('CreateFarmerUseCase', () => {
  let useCase: CreateFarmerUseCase
  let repository: jest.Mocked<FarmerRepository>

  const mockDto: CreateFarmerDto = {
    name: 'João Silva',
    document: '12345678900',
    documentType: 'PF',
  }

  const mockFarmer: FarmerProps = {
    id: 'farmer-id-1',
    name: 'João Silva',
    document: '12345678900',
    documentType: 'PF',
    createdAt: new Date(),
  }

  beforeEach(() => {
    repository = mockFarmerRepository() as any
    useCase = new CreateFarmerUseCase(repository)
  })

  it('should create a farmer if document does not exist', async () => {
    repository.isDocumentExists.mockResolvedValue(false)
    repository.save.mockResolvedValue(mockFarmer as any)

    const result = await useCase.execute(mockDto)

    expect(repository.isDocumentExists).toHaveBeenCalledWith(mockDto.document)
    expect(repository.save).toHaveBeenCalledWith(mockDto)
    expect(result).toEqual(mockFarmer)
  })

  it('should throw InternalServerErrorException if document already exists', async () => {
    repository.isDocumentExists.mockResolvedValue(true)

    await expect(useCase.execute(mockDto)).rejects.toThrow(
      InternalServerErrorException,
    )
    await expect(useCase.execute(mockDto)).rejects.toThrow(
      'Já existe outro produtor com este documento',
    )
    expect(repository.save).not.toHaveBeenCalled()
  })
})
