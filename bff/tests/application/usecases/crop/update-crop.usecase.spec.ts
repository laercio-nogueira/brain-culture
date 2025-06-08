import { UpdateCropUseCase } from '@application/usecases/crop/update-crop.usecase'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { UpdateResult } from 'typeorm'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'

describe('UpdateCropUseCase', () => {
  let updateCropUseCase: UpdateCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      update: jest.fn(),
    } as unknown as CropRepository

    updateCropUseCase = new UpdateCropUseCase(cropRepository)
  })

  it('should update crop successfully and return UpdateResult', async () => {
    const cropId = 'uuid-123'
    const cropDto: UpdateCropDto = { name: 'Updated Crop' }
    const mockUpdateResult: any = {
      affected: 1,
      raw: {},
    }

    jest.spyOn(cropRepository, 'update').mockResolvedValue(mockUpdateResult)

    const result = await updateCropUseCase.execute(cropId, cropDto)

    expect(cropRepository.update).toHaveBeenCalledWith(cropId, cropDto)
    expect(result).toEqual(mockUpdateResult)
  })

  it('should throw error when repository.update throws', async () => {
    const cropId = 'uuid-123'
    const cropDto: UpdateCropDto = { name: 'Updated Crop' }

    jest
      .spyOn(cropRepository, 'update')
      .mockRejectedValue(new Error('DB error'))

    await expect(updateCropUseCase.execute(cropId, cropDto)).rejects.toThrow(
      'DB error',
    )
  })
})
