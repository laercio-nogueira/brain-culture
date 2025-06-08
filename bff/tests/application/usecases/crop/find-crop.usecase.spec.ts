import { FindCropUseCase } from '@application/usecases/crop/find-crop.usecase'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'

describe('FindCropUseCase', () => {
  let findCropUseCase: FindCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    } as unknown as CropRepository

    findCropUseCase = new FindCropUseCase(cropRepository)
  })

  describe('findOne', () => {
    it('should return a crop when found', async () => {
      const cropId = 'uuid-123'
      const mockCrop: any = { id: cropId, name: 'Wheat' }

      jest.spyOn(cropRepository, 'findOne').mockResolvedValue(mockCrop)

      const result = await findCropUseCase.findOne(cropId)

      expect(cropRepository.findOne).toHaveBeenCalledWith({
        where: { id: cropId },
      })
      expect(result).toEqual(mockCrop)
    })

    it('should throw an error if repository.findOne throws', async () => {
      const cropId = 'uuid-123'

      jest
        .spyOn(cropRepository, 'findOne')
        .mockRejectedValue(new Error('DB error'))

      await expect(findCropUseCase.findOne(cropId)).rejects.toThrow('DB error')
    })
  })

  describe('findAll', () => {
    it('should return a list of crops', async () => {
      const mockCrops: any = [
        { id: 'uuid-1', name: 'Wheat' },
        { id: 'uuid-2', name: 'Corn' },
      ]

      jest.spyOn(cropRepository, 'find').mockResolvedValue(mockCrops)

      const result = await findCropUseCase.findAll()

      expect(cropRepository.find).toHaveBeenCalled()
      expect(result).toEqual(mockCrops)
    })

    it('should throw an error if repository.find throws', async () => {
      jest
        .spyOn(cropRepository, 'find')
        .mockRejectedValue(new Error('DB error'))

      await expect(findCropUseCase.findAll()).rejects.toThrow('DB error')
    })
  })
})
