import { CreateFarmUseCase } from '@application/usecases/farm/create-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'

describe('CreateFarmUseCase', () => {
  let useCase: CreateFarmUseCase
  let farmRepository: Partial<FarmRepository>

  beforeEach(() => {
    farmRepository = {
      save: jest.fn(),
    }
    useCase = new CreateFarmUseCase(farmRepository as FarmRepository)
  })

  it('should save the farm and return the result', async () => {
    const farmDto: CreateFarmDto = {
      name: 'Test Farm',
      city: 'Sao Paulo',
      state: 'SP',
      totalArea: 1000,
      cultivatedArea: 900,
      vegetatedArea: 10,
    }

    const savedFarm = {
      id: '123',
      ...farmDto,
    }

    ;(farmRepository.save as jest.Mock).mockResolvedValue(savedFarm)

    const result = await useCase.execute(farmDto)

    expect(farmRepository.save).toHaveBeenCalledWith(farmDto)
    expect(result).toEqual(savedFarm)
  })

  it('should throw an error if the repository throws', async () => {
    const farmDto: CreateFarmDto = {
      name: 'Test Farm',
      city: 'Minas Gerais',
      state: 'MG',
      totalArea: 200,
      cultivatedArea: 180,
      vegetatedArea: 20,
    }

    const error = new Error('Save failed')

    ;(farmRepository.save as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute(farmDto)).rejects.toThrowError('Save failed')
  })
})
