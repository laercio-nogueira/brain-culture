import { Test, TestingModule } from '@nestjs/testing'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { FarmEntity } from '@infrastructure/database/entities/farm.entity'

describe('FarmRepository', () => {
  let repository: FarmRepository
  let dataSource: DataSource
  let queryBuilder: jest.Mocked<SelectQueryBuilder<FarmEntity>>

  beforeEach(async () => {
    queryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn(),
      then: jest.fn(),
    } as any

    const dataSourceMock = {
      createEntityManager: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmRepository,
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile()

    repository = module.get<FarmRepository>(FarmRepository)
    dataSource = module.get<DataSource>(DataSource)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('getTotalAreas', () => {
    it('should return total areas data', async () => {
      const mockResult = {
        totalFarms: '5',
        totalArea: '1000',
        totalCultivatedArea: '600',
        totalVegetatedArea: '400',
      }
      queryBuilder.getRawOne.mockResolvedValue(mockResult)

      const result = await repository.getTotalAreas()

      expect(dataSource.createQueryBuilder).toHaveBeenCalledWith(
        FarmEntity,
        'farm',
      )
      expect(queryBuilder.select).toHaveBeenCalled()
      expect(queryBuilder.getRawOne).toHaveBeenCalled()
      expect(result).toEqual(mockResult)
    })
  })

  describe('getFarmByState', () => {
    it('should return farms grouped by state', async () => {
      const mockResult = [
        { state: 'SP', count: 10 },
        { state: 'RJ', count: 5 },
      ]
      queryBuilder.getRawMany.mockResolvedValue(mockResult)

      const result = await repository.getFarmByState()

      expect(dataSource.createQueryBuilder).toHaveBeenCalledWith(
        FarmEntity,
        'farm',
      )
      expect(queryBuilder.select).toHaveBeenCalledWith(
        'UPPER(farm.state)',
        'state',
      )
      expect(queryBuilder.addSelect).toHaveBeenCalled()
      expect(queryBuilder.groupBy).toHaveBeenCalledWith('UPPER(farm.state)')
      expect(queryBuilder.getRawMany).toHaveBeenCalled()
      expect(result).toEqual(mockResult)
    })
  })

  describe('getFarmByCrops', () => {
    it('should return farms count grouped by crop', async () => {
      const mockRawResult = [
        { cropName: 'Corn', farmCount: '3' },
        { cropName: 'Wheat', farmCount: '2' },
      ]

      queryBuilder.getRawMany.mockResolvedValue(mockRawResult)

      const result = await repository.getFarmByCrops()

      expect(dataSource.createQueryBuilder).toHaveBeenCalledWith(
        FarmEntity,
        'farm',
      )
      expect(queryBuilder.innerJoin).toHaveBeenCalledTimes(2)
      expect(queryBuilder.select).toHaveBeenCalledWith('crop.name', 'cropName')
      expect(queryBuilder.addSelect).toHaveBeenCalledWith(
        'COUNT(DISTINCT farm.id)',
        'farmCount',
      )
      expect(queryBuilder.groupBy).toHaveBeenCalledWith('crop.name')
      expect(queryBuilder.orderBy).toHaveBeenCalledWith(
        'COUNT(DISTINCT farm.id)',
        'DESC',
      )
      expect(queryBuilder.getRawMany).toHaveBeenCalled()
      expect(result).toEqual([
        { cropName: 'Corn', farmCount: 3 },
        { cropName: 'Wheat', farmCount: 2 },
      ])
    })
  })
})
