import { FindFarmUseCase } from '@application/usecases/farm/find-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { FarmProps } from '@domain/entities/farm.entity'

const mockFarmRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
})

describe('FindFarmUseCase', () => {
  let useCase: FindFarmUseCase
  let repository: jest.Mocked<FarmRepository>

  beforeEach(() => {
    repository = mockFarmRepository() as any
    useCase = new FindFarmUseCase(repository)
  })

  describe('findOne', () => {
    it('should return a farm by id', async () => {
      const mockFarm: FarmProps = {
        id: '1',
        name: 'Fazenda Boa Vista',
        city: 'Sao Paulo',
        state: 'SP',
        totalArea: 100,
        cultivatedArea: 50,
        vegetatedArea: 30,
      } as FarmProps
      repository.findOne.mockResolvedValue(mockFarm as any)

      const result = await useCase.findOne('1')

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } })
      expect(result).toEqual(mockFarm)
    })

    it('should throw a specific error if repository throws', async () => {
      repository.findOne.mockRejectedValue(new Error('DB Error'))

      await expect(useCase.findOne('1')).rejects.toThrow('Error finding farm')
    })
  })

  describe('findAll', () => {
    it('should return all farms', async () => {
      const mockFarms = [
        [
          { id: '1', name: 'Fazenda A' },
          { id: '2', name: 'Fazenda B' },
        ],
        10,
      ]

      repository.findAndCount.mockResolvedValue(mockFarms as any)

      const result = await useCase.findAll(1, 10)

      expect(repository.findAndCount).toHaveBeenCalledWith({
        relations: {
          harvests: {
            crops: true,
          },
        },
        skip: 0,
        take: 10,
      })
      expect(result).toEqual({
        data: [
          { id: '1', name: 'Fazenda A' },
          { id: '2', name: 'Fazenda B' },
        ],
        limit: 10,
        page: 1,
        total: 10,
      })
    })

    it('should throw a specific error if repository throws', async () => {
      repository.find.mockRejectedValue(new Error('Query failed'))

      await expect(useCase.findAll()).rejects.toThrow('Error finding farm')
    })
  })
})
