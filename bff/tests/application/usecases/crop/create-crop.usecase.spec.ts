import { CreateCropUseCase } from '@application/usecases/crop/create-crop.usecase'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'

describe('CreateCropUseCase', () => {
  let createCropUseCase: CreateCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      save: jest.fn(),
    } as unknown as CropRepository

    createCropUseCase = new CreateCropUseCase(cropRepository)
  })

  it('should save crop successfully and return CropProps', async () => {
    const cropDto: CreateCropDto = {
      name: 'Corn',
      harvestId: null,
    }

    const savedCrop: any = {
      id: 'uuid-123',
      name: 'Corn',
      harvestId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Mocka o método save para resolver com o savedCrop
    jest.spyOn(cropRepository, 'save').mockResolvedValue(savedCrop)

    const result = await createCropUseCase.execute(cropDto)

    expect(cropRepository.save).toHaveBeenCalledWith(cropDto)
    expect(result).toEqual(savedCrop)
  })

  it('should throw error when repository.save throws', async () => {
    const cropDto: CreateCropDto = {
      name: 'Corn',
      harvestId: null,
    }

    jest.spyOn(cropRepository, 'save').mockRejectedValue(new Error('DB error'))

    await expect(createCropUseCase.execute(cropDto)).rejects.toThrow(
      'Error creating crop',
    )
  })
})
