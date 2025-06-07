import { Test, TestingModule } from '@nestjs/testing'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'

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
      execute: jest.fn(),
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
})
