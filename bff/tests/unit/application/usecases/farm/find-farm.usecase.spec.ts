import { FindFarmUseCase } from '@application/usecases/farm/find-farm.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { FarmProps } from '@domain/entities/farm.entity'

const mockFarmRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
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
      const mockFarms: FarmProps[] = [
        { id: '1', name: 'Fazenda A' },
        { id: '2', name: 'Fazenda B' },
      ] as FarmProps[]

      repository.find.mockResolvedValue(mockFarms as any)

      const result = await useCase.findAll()

      expect(repository.find).toHaveBeenCalledWith({
        relations: {
          harvests: {
            crops: true,
          },
        },
      })
      expect(result).toEqual(mockFarms)
    })

    it('should throw a specific error if repository throws', async () => {
      repository.find.mockRejectedValue(new Error('Query failed'))

      await expect(useCase.findAll()).rejects.toThrow('Error finding farm')
    })
  })
})
