import { FindCropUseCase } from '@application/usecases/crop/find-crop.usecase'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'

describe('FindCropUseCase', () => {
  let findCropUseCase: FindCropUseCase
  let cropRepository: CropRepository

  beforeEach(() => {
    cropRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      findAndCount: jest.fn(),
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
      const mockCrops = [[{ id: 'uuid-1', name: 'Milho' }], 10]

      jest
        .spyOn(cropRepository, 'findAndCount')
        .mockResolvedValue(mockCrops as any)

      const result = await findCropUseCase.findAll(1, 10)

      expect(cropRepository.findAndCount).toHaveBeenCalled()
      expect(result).toEqual({
        data: [{ id: 'uuid-1', name: 'Milho' }],
        limit: 10,
        page: 1,
        total: 10,
      })
    })

    it('should throw an error if repository.find throws', async () => {
      jest
        .spyOn(cropRepository, 'findAndCount')
        .mockRejectedValue(new Error('DB error'))

      await expect(findCropUseCase.findAll()).rejects.toThrow('DB error')
    })
  })
})
