import { Test, TestingModule } from '@nestjs/testing'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { DataSource, EntityManager } from 'typeorm'
import { HarvestEntity } from '@infrastructure/database/entities/harvest.entity'

describe('HarvestRepository', () => {
  let repository: HarvestRepository
  let dataSource: DataSource

  beforeEach(async () => {
    const mockEntityManager = {} as EntityManager

    const dataSourceMock = {
      createEntityManager: jest.fn().mockReturnValue(mockEntityManager),
    } as unknown as DataSource

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestRepository,
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile()

    repository = module.get<HarvestRepository>(HarvestRepository)
    dataSource = module.get<DataSource>(DataSource)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  it('should call createEntityManager once on instantiation', () => {
    expect(dataSource.createEntityManager).toHaveBeenCalledTimes(1)
  })
})
