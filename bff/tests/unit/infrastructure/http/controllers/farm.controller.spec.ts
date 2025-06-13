import { Test, TestingModule } from '@nestjs/testing'
import { FarmController } from '@infrastructure/http/controllers/farm.controller'
import { FarmService } from '@domain/services/farm.service'
import {
  FarmCreateDto,
  FarmDeleteResponseDto,
  FarmResponseDto,
} from '@application/contracts/farm.contract'
import { Logger } from '@nestjs/common'

describe('FarmController', () => {
  let controller: FarmController
  let service: FarmService

  const mockFarmService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [
        { provide: FarmService, useValue: mockFarmService },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<FarmController>(FarmController)
    service = module.get<FarmService>(FarmService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call farmService.create and return the result', async () => {
      const dto: FarmCreateDto = {
        name: 'Farm 1',
        city: 'City',
        state: 'ST',
        totalArea: 100,
        cultivatedArea: 70,
        vegetatedArea: 30,
      }
      const createdFarm: FarmResponseDto = {
        id: 'uuid',
        ...dto,
        createdAt: undefined,
      }

      mockFarmService.create.mockResolvedValue(createdFarm)

      const result = await controller.create(dto as any)

      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toEqual(createdFarm)
    })
  })

  describe('findAll', () => {
    it('should call farmService.findAll and return the result', async () => {
      const farms: FarmResponseDto[] = [
        {
          id: 'uuid1',
          name: 'Farm 1',
          city: 'City',
          state: 'ST',
          totalArea: 100,
          cultivatedArea: 70,
          vegetatedArea: 30,
          createdAt: new Date(),
        },
      ]

      mockFarmService.findAll.mockResolvedValue(farms)

      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(farms)
    })
  })

  describe('findOne', () => {
    it('should call farmService.findOne and return the result', async () => {
      const farmId = 'uuid1'
      const farm: FarmResponseDto = {
        id: farmId,
        name: 'Farm 1',
        city: 'City',
        state: 'ST',
        totalArea: 100,
        cultivatedArea: 70,
        vegetatedArea: 30,
        createdAt: new Date(),
      }

      mockFarmService.findOne.mockResolvedValue(farm)

      const result = await controller.findOne(farmId)

      expect(service.findOne).toHaveBeenCalledWith(farmId)
      expect(result).toEqual(farm)
    })
  })

  describe('update', () => {
    it('should call farmService.update and return the result', async () => {
      const farmId = 'uuid1'
      const dto = {
        name: 'Farm Updated',
        city: 'City',
        state: 'ST',
        totalArea: 120,
        cultivatedArea: 80,
        vegetatedArea: 40,
        farmerId: 'farmer-uuid',
      }
      const updatedFarm: FarmResponseDto = {
        id: farmId,
        ...dto,
        createdAt: new Date(),
      }

      mockFarmService.update.mockResolvedValue(updatedFarm)

      const result = await controller.update(farmId, dto)

      expect(service.update).toHaveBeenCalledWith(farmId, dto)
      expect(result).toEqual(updatedFarm)
    })
  })

  describe('remove', () => {
    it('should call farmService.remove and return the result', async () => {
      const farmId = 'uuid1'
      const deleteResponse: FarmDeleteResponseDto = {
        message: 'Farm deleted successfully',
      }

      mockFarmService.remove.mockResolvedValue(deleteResponse)

      const result = await controller.remove(farmId)

      expect(service.remove).toHaveBeenCalledWith(farmId)
      expect(result).toEqual(deleteResponse)
    })
  })
})
