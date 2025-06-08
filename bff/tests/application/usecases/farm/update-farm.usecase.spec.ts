import { UpdateFarmUseCase } from '@application/usecases/farm/update-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { UpdateResult } from 'typeorm'

describe('UpdateFarmUseCase', () => {
  let updateFarmUseCase: UpdateFarmUseCase
  let farmRepository: FarmRepository

  beforeEach(() => {
    farmRepository = {
      update: jest.fn(),
    } as unknown as FarmRepository

    updateFarmUseCase = new UpdateFarmUseCase(farmRepository)
  })

  it('should update a farm successfully', async () => {
    const mockUpdateResult: UpdateResult = { affected: 1, raw: [] } as any
    jest.spyOn(farmRepository, 'update').mockResolvedValue(mockUpdateResult)

    const result = await updateFarmUseCase.execute('farm-id', {
      name: 'New Name',
    } as any)

    expect(farmRepository.update).toHaveBeenCalledWith('farm-id', {
      name: 'New Name',
    })
    expect(result).toBe(mockUpdateResult)
  })

  it('should throw an error if update fails', async () => {
    jest
      .spyOn(farmRepository, 'update')
      .mockRejectedValue(new Error('DB error'))

    await expect(
      updateFarmUseCase.execute('farm-id', { name: 'New Name' } as any),
    ).rejects.toThrow('Error updating farm')
  })
})
