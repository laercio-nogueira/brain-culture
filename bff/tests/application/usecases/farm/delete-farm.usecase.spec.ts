import { DeleteFarmUseCase } from '@application/usecases/farm/delete-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'

describe('DeleteFarmUseCase', () => {
  let deleteFarmUseCase: DeleteFarmUseCase
  let farmRepository: FarmRepository

  beforeEach(() => {
    farmRepository = {
      delete: jest.fn(),
    } as unknown as FarmRepository

    deleteFarmUseCase = new DeleteFarmUseCase(farmRepository)
  })

  it('should delete farm successfully', async () => {
    jest.spyOn(farmRepository, 'delete').mockResolvedValue(undefined)

    const result = await deleteFarmUseCase.execute('some-id')

    expect(farmRepository.delete).toHaveBeenCalledWith('some-id')
    expect(result).toEqual({ message: 'Farm deleted successfully' })
  })

  it('should throw error when delete fails', async () => {
    jest
      .spyOn(farmRepository, 'delete')
      .mockRejectedValue(new Error('DB error'))

    await expect(deleteFarmUseCase.execute('some-id')).rejects.toThrow(
      'Error deleting farm',
    )
  })
})
