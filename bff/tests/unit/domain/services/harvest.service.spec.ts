import { Test, TestingModule } from '@nestjs/testing'
import { HarvestService } from '@domain/services/harvest.service'
import { CreateHarvestUseCase } from '@application/usecases/harvest/create-harvest.usecase'
import { FindHarvestUseCase } from '@application/usecases/harvest/find-harvest.usecase'
import { DeleteHarvestUseCase } from '@application/usecases/harvest/delete-harvest.usecase'
import { UpdateHarvestUseCase } from '@application/usecases/harvest/update-harvest.usecase'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'

describe('HarvestService', () => {
  let service: HarvestService
  let createHarvestUseCase: jest.Mocked<CreateHarvestUseCase>
  let findHarvestUseCase: jest.Mocked<FindHarvestUseCase>
  let updateHarvestUseCase: jest.Mocked<UpdateHarvestUseCase>
  let deleteHarvestUseCase: jest.Mocked<DeleteHarvestUseCase>

  beforeEach(async () => {
    createHarvestUseCase = { execute: jest.fn() } as any
    findHarvestUseCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as any
    updateHarvestUseCase = { execute: jest.fn() } as any
    deleteHarvestUseCase = { execute: jest.fn() } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        { provide: CreateHarvestUseCase, useValue: createHarvestUseCase },
        { provide: FindHarvestUseCase, useValue: findHarvestUseCase },
        { provide: UpdateHarvestUseCase, useValue: updateHarvestUseCase },
        { provide: DeleteHarvestUseCase, useValue: deleteHarvestUseCase },
      ],
    }).compile()

    service = module.get<HarvestService>(HarvestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a harvest', async () => {
    const dto: CreateHarvestDto = {
      name: 'Colheita 1',
      year: 2025,
      farmId: 'farm1',
    }
    const result = { id: 'harvest1', ...dto }

    createHarvestUseCase.execute.mockResolvedValue(result)

    expect(await service.create(dto)).toEqual(result)
    expect(createHarvestUseCase.execute).toHaveBeenCalledWith(dto)
  })

  it('should find all harvests', async () => {
    const result = [{ id: '1', name: 'Colheita 1', year: 2024 }]
    findHarvestUseCase.findAll.mockResolvedValue(result)

    expect(await service.findAll()).toEqual(result)
    expect(findHarvestUseCase.findAll).toHaveBeenCalled()
  })

  it('should find one harvest', async () => {
    const result = { id: '1', name: 'Colheita 1', year: 2024 }
    findHarvestUseCase.findOne.mockResolvedValue(result)

    expect(await service.findOne('1')).toEqual(result)
    expect(findHarvestUseCase.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a harvest', async () => {
    const dto: UpdateHarvestDto = { name: 'Nova Colheita', year: 2025 }
    const updateResult = { affected: 1 }
    updateHarvestUseCase.execute.mockResolvedValue(updateResult as any)

    expect(await service.update('1', dto)).toEqual(updateResult)
    expect(updateHarvestUseCase.execute).toHaveBeenCalledWith('1', dto)
  })

  it('should remove a harvest', async () => {
    const response = { message: 'Harvest deleted successfully' }
    deleteHarvestUseCase.execute.mockResolvedValue(response)

    expect(await service.remove('1')).toEqual(response)
    expect(deleteHarvestUseCase.execute).toHaveBeenCalledWith('1')
  })
})
