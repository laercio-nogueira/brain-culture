import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
})

describe('FindFarmerUseCase', () => {
  let useCase: FindFarmerUseCase
  let repository: jest.Mocked<FarmerRepository>

  beforeEach(() => {
    repository = mockRepository() as any
    useCase = new FindFarmerUseCase(repository)
  })

  describe('findOne', () => {
    it('should return a farmer by id', async () => {
      const mockFarmer = {
        id: '1',
        name: 'João',
        document: '12345678901',
        documentType: 'PF',
        farms: [],
      }
      repository.findOne.mockResolvedValue(mockFarmer)

      const result = await useCase.findOne('1')

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } })
      expect(result).toEqual(mockFarmer)
    })

    it('should throw if repository throws', async () => {
      repository.findOne.mockRejectedValue(new Error('Database error'))

      await expect(useCase.findOne('1')).rejects.toThrow('Database error')
    })
  })

  describe('findAll', () => {
    it('should return all farmers with masked documents', async () => {
      const mockFarmers = [
        [
          {
            id: '1',
            name: 'João',
            document: '12345678901',
            documentType: 'PF',
            farms: [],
          },
          {
            id: '2',
            name: 'Empresa X',
            document: '12345678000199',
            documentType: 'PJ',
            farms: [],
          },
        ],
        10,
      ]

      repository.findAndCount.mockResolvedValue(mockFarmers as any)

      const result = await useCase.findAll(1, 10)

      expect(repository.findAndCount).toHaveBeenCalledWith({
        relations: {
          farms: {
            harvests: {
              crops: true,
            },
          },
        },
        skip: 0,
        take: 10,
      })

      expect(result).toEqual({
        data: [
          {
            document: '123.456.789-01',
            documentType: 'PF',
            farms: [],
            id: '1',
            name: 'João',
          },
          {
            document: '12.345.678/0001-99',
            documentType: 'PJ',
            farms: [],
            id: '2',
            name: 'Empresa X',
          },
        ],
        limit: 10,
        page: 1,
        total: 10,
      })
    })

    it('should throw if repository throws', async () => {
      repository.findAndCount.mockRejectedValue(new Error('Query failed'))

      await expect(useCase.findAll()).rejects.toThrow('Query failed')
    })
  })
})
