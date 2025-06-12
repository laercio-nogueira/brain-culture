import { Test, TestingModule } from '@nestjs/testing'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'
import { DataSource, Repository } from 'typeorm'

describe('CropRepository', () => {
  let repository: CropRepository
  let dataSource: DataSource

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile()

    repository = module.get<CropRepository>(CropRepository)
    dataSource = module.get<DataSource>(DataSource)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
    expect(repository).toBeInstanceOf(Repository)
  })

  it('should call createEntityManager on DataSource', () => {
    expect(dataSource.createEntityManager).toHaveBeenCalled()
  })
})
