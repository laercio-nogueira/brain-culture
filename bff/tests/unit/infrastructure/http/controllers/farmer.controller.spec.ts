import { Test, TestingModule } from '@nestjs/testing'
import { FarmerController } from '@infrastructure/http/controllers/farmer.controller'
import { FarmerService } from '@domain/services/farmer.service'
import {
  FarmerCreateDto,
  FarmerDeleteResponseDto,
  FarmerResponseDto,
} from '@application/contracts/farmer.contract'
import { Logger } from '@nestjs/common'

describe('FarmerController', () => {
  let controller: FarmerController
  let service: FarmerService

  const mockFarmerService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        { provide: FarmerService, useValue: mockFarmerService },
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

    controller = module.get<FarmerController>(FarmerController)
    service = module.get<FarmerService>(FarmerService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call farmerService.create and return the result', async () => {
      const dto: FarmerCreateDto = {
        document: '12345678900',
        documentType: 'PF',
        name: 'John Doe',
      }
      const createdFarmer: FarmerResponseDto = { id: 'uuid', ...dto }

      mockFarmerService.create.mockResolvedValue(createdFarmer)

      const result = await controller.create(dto as any)

      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toEqual(createdFarmer)
    })
  })

  describe('findAll', () => {
    it('should call farmerService.findAll and return the result', async () => {
      const farmers: FarmerResponseDto[] = [
        { id: 'uuid1', document: '123', documentType: 'CPF', name: 'John Doe' },
      ]

      mockFarmerService.findAll.mockResolvedValue(farmers)

      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(farmers)
    })
  })

  describe('findOne', () => {
    it('should call farmerService.findOne and return the result', async () => {
      const farmerId = 'uuid1'
      const farmer: FarmerResponseDto = {
        id: farmerId,
        document: '12345678900',
        documentType: 'CPF',
        name: 'John Doe',
      }

      mockFarmerService.findOne.mockResolvedValue(farmer)

      const result = await controller.findOne(farmerId)

      expect(service.findOne).toHaveBeenCalledWith(farmerId)
      expect(result).toEqual(farmer)
    })
  })

  describe('update', () => {
    it('should call farmerService.update and return the result', async () => {
      const farmerId = 'uuid1'
      const dto = {
        document: '98765432100',
        documentType: 'CPF',
        name: 'John Updated',
      }
      const updatedFarmer: FarmerResponseDto = { id: farmerId, ...dto }

      mockFarmerService.update.mockResolvedValue(updatedFarmer)

      const result = await controller.update(farmerId, dto as any)

      expect(service.update).toHaveBeenCalledWith(farmerId, dto)
      expect(result).toEqual(updatedFarmer)
    })
  })

  describe('remove', () => {
    it('should call farmerService.remove and return the result', async () => {
      const farmerId = 'uuid1'
      const deleteResponse: FarmerDeleteResponseDto = {
        message: 'Dado cadastrado com sucesso',
      }

      mockFarmerService.remove.mockResolvedValue(deleteResponse)

      const result = await controller.remove(farmerId)

      expect(service.remove).toHaveBeenCalledWith(farmerId)
      expect(result).toEqual(deleteResponse)
    })
  })
})
