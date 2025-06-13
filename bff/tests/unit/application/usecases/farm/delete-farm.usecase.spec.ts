import { DeleteFarmUseCase } from '@application/usecases/farm/delete-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { ForeingKeyConstraintException } from '@application/exceptions/foreign-key-constraint.exception'

const mockFarmRepository = () => ({
  delete: jest.fn(),
})

describe('DeleteFarmUseCase', () => {
  let useCase: DeleteFarmUseCase
  let repository: jest.Mocked<FarmRepository>

  beforeEach(() => {
    repository = mockFarmRepository() as any
    useCase = new DeleteFarmUseCase(repository)
  })

  describe('execute', () => {
    it('should delete a farm and return a success message', async () => {
      repository.delete.mockResolvedValue(undefined)

      const result = await useCase.execute('farm-id-1')

      expect(repository.delete).toHaveBeenCalledWith('farm-id-1')
      expect(result).toEqual({ message: 'Fazenda deletada com sucesso' })
    })

    it('should throw ForeingKeyConstraintException if deletion fails', async () => {
      const dbError = new Error('foreign key violation')
      repository.delete.mockRejectedValue(dbError)

      try {
        await useCase.execute('farm-id-1')
        fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('foreign key violation')
      }
    })
  })
})
