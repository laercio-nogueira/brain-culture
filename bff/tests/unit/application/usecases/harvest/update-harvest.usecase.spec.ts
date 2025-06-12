import { UpdateHarvestUseCase } from '@application/usecases/harvest/update-harvest.usecase'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { UpdateResult } from 'typeorm'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'

const mockHarvestRepository = () => ({
  update: jest.fn(),
})

describe('UpdateHarvestUseCase', () => {
  let useCase: UpdateHarvestUseCase
  let repository: jest.Mocked<HarvestRepository>

  const mockId = 'harvest-id-1'
  const mockUpdateDto: UpdateHarvestDto = {
    name: 'Safra Atualizada',
    year: 2025,
  }

  const mockUpdateResult: UpdateResult = {
    generatedMaps: [],
    raw: [],
    affected: 1,
  }

  beforeEach(() => {
    repository = mockHarvestRepository() as any
    useCase = new UpdateHarvestUseCase(repository)
  })

  it('should update harvest successfully', async () => {
    repository.update.mockResolvedValue(mockUpdateResult)

    const result = await useCase.execute(mockId, mockUpdateDto)

    expect(repository.update).toHaveBeenCalledWith(mockId, mockUpdateDto)
    expect(result).toEqual(mockUpdateResult)
  })

  it('should throw if update fails', async () => {
    const error = new Error('DB error')
    repository.update.mockRejectedValue(error)

    await expect(useCase.execute(mockId, mockUpdateDto)).rejects.toThrow(
      'DB error',
    )
  })
})
