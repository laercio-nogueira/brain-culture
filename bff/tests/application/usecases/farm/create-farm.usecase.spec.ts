import { CreateFarmUseCase } from '@application/usecases/farm/create-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { NotFoundException } from '@nestjs/common'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'

describe('CreateFarmUseCase', () => {
  let createFarmUseCase: CreateFarmUseCase
  let farmRepository: FarmRepository
  let farmerRepository: FarmerRepository

  beforeEach(() => {
    farmRepository = {
      save: jest.fn(),
      create: jest.fn(),
    } as unknown as FarmRepository

    farmerRepository = {
      findOneOrFail: jest.fn(),
    } as unknown as FarmerRepository

    createFarmUseCase = new CreateFarmUseCase(farmRepository, farmerRepository)
  })

  it('should create farm without farmerId', async () => {
    const farmDto: CreateFarmDto = {
      name: 'Farm A',
      city: 'City A',
      state: 'ST',
      totalArea: 100,
      cultivatedArea: 40,
      vegetatedArea: 50,
    }

    const savedFarm: any = { id: 'uuid-farm-1', ...farmDto }

    jest.spyOn(farmRepository, 'save').mockResolvedValue(savedFarm)

    const result = await createFarmUseCase.execute(farmDto)

    expect(farmRepository.save).toHaveBeenCalledWith(farmDto)
    expect(result).toEqual(savedFarm)
  })

  it('should create farm with valid farmerId', async () => {
    const farmDto: CreateFarmDto = {
      name: 'Farm B',
      city: 'City B',
      state: 'ST',
      totalArea: 100,
      cultivatedArea: 40,
      vegetatedArea: 50,
      farmerId: 'valid-uuid',
    }
    const farmer = { id: 'valid-uuid', name: 'John Farmer' }
    const createdFarm: any = { id: 'uuid-farm-2', ...farmDto, farmer }

    jest.spyOn(farmRepository, 'save').mockResolvedValue(createdFarm)

    const result = await createFarmUseCase.execute(farmDto)

    expect(farmRepository.save).toHaveBeenCalledWith(farmDto)
    expect(result).toEqual(createdFarm)
  })
})
