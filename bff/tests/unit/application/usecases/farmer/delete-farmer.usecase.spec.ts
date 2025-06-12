import { Test, TestingModule } from '@nestjs/testing'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { InternalServerErrorException } from '@nestjs/common'

describe('DeleteFarmerUseCase', () => {
  let deleteFarmerUseCase: DeleteFarmerUseCase
  let farmerRepository: FarmerRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteFarmerUseCase,
        {
          provide: FarmerRepository,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    deleteFarmerUseCase = module.get<DeleteFarmerUseCase>(DeleteFarmerUseCase)
    farmerRepository = module.get<FarmerRepository>(FarmerRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    const farmerId = '1'

    it('should successfully delete a farmer and return success message', async () => {
      jest.spyOn(farmerRepository, 'delete').mockResolvedValue(undefined)

      const result = await deleteFarmerUseCase.execute(farmerId)

      expect(result).toEqual({
        message: 'Farmer deleted successfully',
      })
      expect(farmerRepository.delete).toHaveBeenCalledWith({ id: farmerId })
    })

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const errorMessage = 'Database connection failed'
      jest
        .spyOn(farmerRepository, 'delete')
        .mockRejectedValue(new Error(errorMessage))

      await expect(deleteFarmerUseCase.execute(farmerId)).rejects.toThrow(
        new InternalServerErrorException(errorMessage),
      )
    })
  })
})
