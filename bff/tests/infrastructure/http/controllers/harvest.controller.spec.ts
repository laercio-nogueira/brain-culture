import { Test, TestingModule } from '@nestjs/testing'
import { HarvestController } from '@infrastructure/http/controllers/harvest.controller'
import { HarvestService } from '@domain/services/harvest.service'
import {
  HarvestCreateDto,
  HarvestDeleteResponseDto,
  HarvestResponseDto,
} from '@application/contracts/harvest.contract'

describe('HarvestController', () => {
  let controller: HarvestController
  let service: HarvestService

  const mockHarvestService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [{ provide: HarvestService, useValue: mockHarvestService }],
    }).compile()

    controller = module.get<HarvestController>(HarvestController)
    service = module.get<HarvestService>(HarvestService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call harvestService.create and return the result', async () => {
      const dto: HarvestCreateDto = {
        name: 'Safra 2025',
        year: 2025,
      }
      const createdHarvest: HarvestResponseDto = {
        name: '',
        year: 0,
        createdAt: undefined,
      }

      mockHarvestService.create.mockResolvedValue(createdHarvest)

      const result = await controller.create(dto as any)

      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toEqual(createdHarvest)
    })
  })

  describe('findAll', () => {
    it('should call harvestService.findAll and return the result', async () => {
      const harvests: HarvestResponseDto[] = [
        {
          id: 'uuid1',
          name: 'Safra 2024',
          year: 2024,
          createdAt: new Date(),
        },
      ]

      mockHarvestService.findAll.mockResolvedValue(harvests)

      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(harvests)
    })
  })

  describe('findOne', () => {
    it('should call harvestService.findOne and return the result', async () => {
      const harvestId = 'uuid1'
      const harvest: HarvestResponseDto = {
        id: harvestId,
        name: 'Safra 2024',
        year: 2024,
        createdAt: new Date(),
      }

      mockHarvestService.findOne.mockResolvedValue(harvest)

      const result = await controller.findOne(harvestId)

      expect(service.findOne).toHaveBeenCalledWith(harvestId)
      expect(result).toEqual(harvest)
    })
  })

  describe('update', () => {
    it('should call harvestService.update and return the result', async () => {
      const harvestId = 'uuid1'
      const dto = {
        name: 'Safra Atualizada',
        year: 2025,
        farmId: 'farm-uuid',
      }
      const updatedHarvest: HarvestResponseDto = {
        id: harvestId,
        ...dto,
        createdAt: new Date(),
      }

      mockHarvestService.update.mockResolvedValue(updatedHarvest)

      const result = await controller.update(harvestId, dto)

      expect(service.update).toHaveBeenCalledWith(harvestId, dto)
      expect(result).toEqual(updatedHarvest)
    })
  })

  describe('remove', () => {
    it('should call harvestService.remove and return the result', async () => {
      const harvestId = 'uuid1'
      const deleteResponse: HarvestDeleteResponseDto = {
        message: 'Safra deletada com sucesso',
      }

      mockHarvestService.remove.mockResolvedValue(deleteResponse)

      const result = await controller.remove(harvestId)

      expect(service.remove).toHaveBeenCalledWith(harvestId)
      expect(result).toEqual(deleteResponse)
    })
  })
})
