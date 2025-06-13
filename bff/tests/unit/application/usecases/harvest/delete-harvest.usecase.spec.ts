import { DeleteHarvestUseCase } from '@application/usecases/harvest/delete-harvest.usecase'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'

describe('DeleteHarvestUseCase', () => {
  let useCase: DeleteHarvestUseCase
  let harvestRepository: Partial<HarvestRepository>

  beforeEach(() => {
    harvestRepository = {
      delete: jest.fn(),
    }
    useCase = new DeleteHarvestUseCase(harvestRepository as HarvestRepository)
  })

  it('should delete the harvest and return success message', async () => {
    ;(harvestRepository.delete as jest.Mock).mockResolvedValue(undefined)

    const result = await useCase.execute('some-id')

    expect(harvestRepository.delete).toHaveBeenCalledWith('some-id')
    expect(result).toEqual({ message: 'Harvest deleted successfully' })
  })

  it('should throw ForeingKeyConstraintException when repository throws', async () => {
    const error = new Error('Foreign key violation')

    const mockDelete = harvestRepository.delete as jest.Mock
    mockDelete.mockRejectedValue(error)

    await expect(useCase.execute('some-id')).rejects.toThrow(
      'Foreign key violation',
    )
  })
})
