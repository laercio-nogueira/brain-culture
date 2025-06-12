import { DeleteCropUseCase } from '@application/usecases/crop/delete-crop.usecase'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'

describe('DeleteCropUseCase', () => {
  let deleteCropUseCase: DeleteCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      delete: jest.fn(),
    } as unknown as CropRepository

    deleteCropUseCase = new DeleteCropUseCase(cropRepository)
  })

  it('should delete crop successfully and return success message', async () => {
    const cropId = 'uuid-123'

    jest.spyOn(cropRepository, 'delete').mockResolvedValue(undefined)

    const result = await deleteCropUseCase.execute(cropId)

    expect(cropRepository.delete).toHaveBeenCalledWith(cropId)
    expect(result).toEqual({ message: 'Crop deleted successfully' })
  })

  it('should throw error when repository.delete throws', async () => {
    const cropId = 'uuid-123'

    jest
      .spyOn(cropRepository, 'delete')
      .mockRejectedValue(new Error('DB error'))

    await expect(deleteCropUseCase.execute(cropId)).rejects.toThrow('DB error')
  })
})
