import { Test, TestingModule } from '@nestjs/testing'
import { FarmerController } from '@infrastructure/http/controllers/farmer.controller'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'

describe('FarmerController', () => {
  let controller: FarmerController
  let farmerService: jest.Mocked<FarmerService>

  beforeEach(async () => {
    farmerService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        {
          provide: FarmerService,
          useValue: farmerService,
        },
        {
          provide: CreateFarmerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindFarmerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateFarmerUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteFarmerUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile()

    controller = module.get<FarmerController>(FarmerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
