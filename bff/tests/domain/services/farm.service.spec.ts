import { FarmService } from '@domain/services/farm.service'
import { CreateFarmUseCase } from '@application/usecases/farm/create-farm.usecase'
import { FindFarmUseCase } from '@application/usecases/farm/find-farm.usecase'
import { DeleteFarmUseCase } from '@application/usecases/farm/delete-farm.usecase'
import { UpdateFarmUseCase } from '@application/usecases/farm/update-farm.usecase'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'
import { FarmProps } from '@domain/entities/farm.entity'

describe('FarmService', () => {
  let farmService: FarmService
  let createFarmUseCase: CreateFarmUseCase
  let findFarmUseCase: FindFarmUseCase
  let deleteFarmUseCase: DeleteFarmUseCase
  let updateFarmUseCase: UpdateFarmUseCase

  beforeEach(() => {
    createFarmUseCase = { execute: jest.fn() } as any
    findFarmUseCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as any
    deleteFarmUseCase = { execute: jest.fn() } as any
    updateFarmUseCase = { execute: jest.fn() } as any

    farmService = new FarmService(
      createFarmUseCase,
      findFarmUseCase,
      deleteFarmUseCase,
      updateFarmUseCase,
    )
  })

  it('should create a farm', async () => {
    const dto: CreateFarmDto = {
      name: 'Fazenda Boa Vista',
      city: 'Campinas',
      state: 'SP',
      totalArea: 100,
      cultivatedArea: 60,
      vegetatedArea: 40,
      farmerId: 'uuid-1',
    }

    const mockFarm: FarmProps = {
      id: 'farm-123',
      ...dto,
    }

    jest.spyOn(createFarmUseCase, 'execute').mockResolvedValue(mockFarm)

    const result = await farmService.create(dto)
    expect(result).toEqual(mockFarm)
    expect(createFarmUseCase.execute).toHaveBeenCalledWith(dto)
  })

  it('should find all farms', async () => {
    const farms: FarmProps[] = [
      {
        id: '1',
        name: 'A',
        city: 'X',
        state: 'SP',
        totalArea: 1,
        cultivatedArea: 1,
        vegetatedArea: 0,
      },
    ]
    jest.spyOn(findFarmUseCase, 'findAll').mockResolvedValue(farms)

    const result = await farmService.findAll()
    expect(result).toBe(farms)
    expect(findFarmUseCase.findAll).toHaveBeenCalled()
  })

  it('should find one farm by id', async () => {
    const farm: FarmProps = {
      id: '1',
      name: 'Fazenda A',
      city: 'X',
      state: 'SP',
      totalArea: 10,
      cultivatedArea: 6,
      vegetatedArea: 4,
    }
    jest.spyOn(findFarmUseCase, 'findOne').mockResolvedValue(farm)

    const result = await farmService.findOne('1')
    expect(result).toBe(farm)
    expect(findFarmUseCase.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a farm', async () => {
    const dto: UpdateFarmDto = {
      name: 'Fazenda Atualizada',
      city: 'Y',
      state: 'SP',
      totalArea: 200,
      cultivatedArea: 100,
      vegetatedArea: 100,
    }

    const mockResult = { affected: 1 }

    jest
      .spyOn(updateFarmUseCase, 'execute')
      .mockResolvedValue(mockResult as any)

    const result = await farmService.update('1', dto)
    expect(result).toBe(mockResult)
    expect(updateFarmUseCase.execute).toHaveBeenCalledWith('1', dto)
  })

  it('should remove a farm', async () => {
    const response = { message: 'Farm deleted successfully' }
    jest.spyOn(deleteFarmUseCase, 'execute').mockResolvedValue(response)

    const result = await farmService.remove('1')
    expect(result).toBe(response)
    expect(deleteFarmUseCase.execute).toHaveBeenCalledWith('1')
  })
})
