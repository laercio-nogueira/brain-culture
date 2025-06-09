import { CreateHarvestUseCase } from '@application/usecases/harvest/create-harvest.usecase'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { HarvestProps } from '@domain/entities/harvest.entity'

const mockHarvestRepository = () => ({
  save: jest.fn(),
})

const mockFarmRepository = () => ({
  // Pode deixar vazio pois não é usado no método execute
})

describe('CreateHarvestUseCase', () => {
  let useCase: CreateHarvestUseCase
  let harvestRepository: jest.Mocked<HarvestRepository>
  let farmRepository: jest.Mocked<FarmRepository>

  const mockDto: CreateHarvestDto = {
    name: 'Safra Verão',
    year: 2025,
    farmId: 'farm-id-123',
  }

  const mockHarvest: HarvestProps = {
    id: 'harvest-id-1',
    name: 'Safra Verão',
    year: 2025,
    farmId: 'farm-id-123',
  }

  beforeEach(() => {
    harvestRepository = mockHarvestRepository() as any
    farmRepository = mockFarmRepository() as any
    useCase = new CreateHarvestUseCase(harvestRepository, farmRepository)
  })

  it('should create a harvest successfully', async () => {
    harvestRepository.save.mockResolvedValue(mockHarvest as any)

    const result = await useCase.execute(mockDto)

    expect(harvestRepository.save).toHaveBeenCalledWith(mockDto)
    expect(result).toEqual(mockHarvest)
  })

  it('should throw if save fails', async () => {
    const error = new Error('DB error')
    harvestRepository.save.mockRejectedValue(error)

    await expect(useCase.execute(mockDto)).rejects.toThrow('DB error')
  })
})
