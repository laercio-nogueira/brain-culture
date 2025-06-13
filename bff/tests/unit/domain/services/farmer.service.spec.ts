import { Test, TestingModule } from '@nestjs/testing'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { FarmerProps } from '@domain/entities/farmer.entity'

describe('FarmerService', () => {
  let service: FarmerService
  let createFarmerUseCase: jest.Mocked<CreateFarmerUseCase>
  let findFarmerUseCase: jest.Mocked<FindFarmerUseCase>
  let updateFarmerUseCase: jest.Mocked<UpdateFarmerUseCase>
  let deleteFarmerUseCase: jest.Mocked<DeleteFarmerUseCase>

  beforeEach(async () => {
    createFarmerUseCase = {
      execute: jest.fn(),
    } as any

    findFarmerUseCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as any

    updateFarmerUseCase = {
      execute: jest.fn(),
    } as any

    deleteFarmerUseCase = {
      execute: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: CreateFarmerUseCase,
          useValue: createFarmerUseCase,
        },
        {
          provide: FindFarmerUseCase,
          useValue: findFarmerUseCase,
        },
        {
          provide: UpdateFarmerUseCase,
          useValue: updateFarmerUseCase,
        },
        {
          provide: DeleteFarmerUseCase,
          useValue: deleteFarmerUseCase,
        },
      ],
    }).compile()

    service = module.get<FarmerService>(FarmerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a farmer', async () => {
    const dto: CreateFarmerDto = {
      document: '12345678900',
      documentType: 'PF',
      name: 'João Silva',
    }

    const farmer: FarmerProps = {
      id: 'farmer-1',
      ...dto,
    }

    createFarmerUseCase.execute.mockResolvedValue(farmer)

    const result = await service.create(dto)
    expect(result).toEqual(farmer)
    expect(createFarmerUseCase.execute).toHaveBeenCalledWith(dto)
  })

  it('should find all farmers', async () => {
    const farmers: {
      data: FarmerProps[]
      total: number
      page: number
      limit: number
    } = {
      data: [
        { id: '1', document: '123', documentType: 'CPF', name: 'A' },
        { id: '2', document: '456', documentType: 'CPF', name: 'B' },
      ],
      total: 2,
      page: 1,
      limit: 10,
    }
    findFarmerUseCase.findAll.mockResolvedValue(farmers)

    const result = await service.findAll()
    expect(result).toBe(farmers)
    expect(findFarmerUseCase.findAll).toHaveBeenCalled()
  })

  it('should find one farmer', async () => {
    const farmer: FarmerProps = {
      id: '1',
      document: '123',
      documentType: 'CPF',
      name: 'João Silva',
    }
    findFarmerUseCase.findOne.mockResolvedValue(farmer)

    const result = await service.findOne('1')
    expect(result).toBe(farmer)
    expect(findFarmerUseCase.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a farmer', async () => {
    const dto: UpdateFarmerDto = {
      document: '12345678900',
      documentType: 'PF',
      name: 'João Atualizado',
    }

    const updateResult = { affected: 1 }
    updateFarmerUseCase.execute.mockResolvedValue(updateResult as any)

    const result = await service.update('1', dto)
    expect(result).toBe(updateResult)
    expect(updateFarmerUseCase.execute).toHaveBeenCalledWith('1', dto)
  })

  it('should remove a farmer', async () => {
    const response = { message: 'Farmer deleted successfully' }
    deleteFarmerUseCase.execute.mockResolvedValue(response)

    const result = await service.remove('1')
    expect(result).toBe(response)
    expect(deleteFarmerUseCase.execute).toHaveBeenCalledWith('1')
  })
})
