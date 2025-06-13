import { Test, TestingModule } from '@nestjs/testing'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'

describe('FarmerRepository', () => {
  let dataSource: DataSource
  let repository: FarmerRepository

  let mockQueryBuilder: Partial<SelectQueryBuilder<FarmerEntity>>

  beforeEach(() => {
    mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
    }

    dataSource = {
      createEntityManager: jest.fn(),
    } as unknown as DataSource

    repository = new FarmerRepository(dataSource)

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as SelectQueryBuilder<FarmerEntity>)
  })

  describe('isDocumentExists', () => {
    it('deve retornar true quando count for maior que zero', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(2)

      const result = await repository.isDocumentExists('123456789')

      expect(repository.createQueryBuilder).toHaveBeenCalledWith('farmer')
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'farmer.document = :document',
        { document: '123456789' },
      )
      expect(mockQueryBuilder.getCount).toHaveBeenCalled()
      expect(result).toBe(true)
    })

    it('deve adicionar filtro excludeId se fornecido', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(1)

      const result = await repository.isDocumentExists(
        '123456789',
        'id-exclude',
      )

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'farmer.id != :excludeId',
        { excludeId: 'id-exclude' },
      )
      expect(result).toBe(true)
    })

    it('deve retornar false quando count for zero', async () => {
      ;(mockQueryBuilder.getCount as jest.Mock).mockResolvedValue(0)

      const result = await repository.isDocumentExists('000000000')

      expect(result).toBe(false)
    })
  })

  describe('isIdExists', () => {
    it('deve retornar true quando count for maior que zero', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(1)

      const result = await repository.isIdExists('some-id')

      expect(repository.count).toHaveBeenCalledWith({
        where: { id: 'some-id' },
      })
      expect(result).toBe(true)
    })

    it('deve retornar false quando count for zero', async () => {
      jest.spyOn(repository, 'count').mockResolvedValue(0)

      const result = await repository.isIdExists('other-id')

      expect(result).toBe(false)
    })
  })
})
