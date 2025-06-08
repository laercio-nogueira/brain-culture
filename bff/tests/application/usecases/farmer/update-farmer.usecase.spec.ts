import { Test, TestingModule } from '@nestjs/testing'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { UpdateResult } from 'typeorm'

describe('UpdateFarmerUseCase', () => {
  let updateFarmerUseCase: UpdateFarmerUseCase
  let farmerRepository: FarmerRepository

  const mockUpdateResult: UpdateResult = {
    affected: 1,
    raw: {},
    generatedMaps: [],
  }

  const mockUpdateFarmerDto: UpdateFarmerDto = {
    name: 'Updated Farmer Name',
    document: '123456789000',
    documentType: 'PF',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateFarmerUseCase,
        {
          provide: FarmerRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile()

    updateFarmerUseCase = module.get<UpdateFarmerUseCase>(UpdateFarmerUseCase)
    farmerRepository = module.get<FarmerRepository>(FarmerRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call repository update with correct parameters', async () => {
    const farmerId = '1'
    jest.spyOn(farmerRepository, 'update').mockResolvedValue(mockUpdateResult)

    const result = await updateFarmerUseCase.execute(
      farmerId,
      mockUpdateFarmerDto,
    )

    expect(farmerRepository.update).toHaveBeenCalledWith(
      farmerId,
      mockUpdateFarmerDto,
    )
    expect(result).toEqual(mockUpdateResult)
  })

  it('should return the update result from repository', async () => {
    const farmerId = '1'
    jest.spyOn(farmerRepository, 'update').mockResolvedValue(mockUpdateResult)

    const result = await updateFarmerUseCase.execute(
      farmerId,
      mockUpdateFarmerDto,
    )

    expect(result).toBe(mockUpdateResult)
  })

  it('should propagate repository errors', async () => {
    const farmerId = '1'
    const error = new Error('Update failed')
    jest.spyOn(farmerRepository, 'update').mockRejectedValue(error)

    await expect(
      updateFarmerUseCase.execute(farmerId, mockUpdateFarmerDto),
    ).rejects.toThrow(error)
  })
})
