import { Test, TestingModule } from '@nestjs/testing'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'

describe('FarmerRepository', () => {
  let repository: FarmerRepository
  let dataSource: DataSource
  let queryBuilder: jest.Mocked<SelectQueryBuilder<FarmerEntity>>

  beforeEach(async () => {
    queryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
    } as any

    const dataSourceMock = {
      createEntityManager: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      count: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerRepository,
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile()

    repository = module.get<FarmerRepository>(FarmerRepository)
    dataSource = module.get<DataSource>(DataSource)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
