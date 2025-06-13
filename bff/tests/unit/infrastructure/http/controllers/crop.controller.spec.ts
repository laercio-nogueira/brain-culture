import { Test, TestingModule } from '@nestjs/testing'
import { CropController } from '@infrastructure/http/controllers/crop.controller'
import { CropService } from '@domain/services/crop.service'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { Logger } from '@nestjs/common'

describe('CropController', () => {
  let controller: CropController
  let service: CropService

  const mockCropService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        { provide: CropService, useValue: mockCropService },
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

    controller = module.get<CropController>(CropController)
    service = module.get<CropService>(CropService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call cropService.create with correct params', async () => {
      const dto: CreateCropDto = { name: 'Tomato', harvestId: 'harvest-uuid' }
      mockCropService.create.mockResolvedValue('createdCrop')

      const result = await controller.create(dto)
      expect(service.create).toHaveBeenCalledWith(dto)
      expect(result).toBe('createdCrop')
    })
  })

  describe('findAll', () => {
    it('should call cropService.findAll and return result', async () => {
      mockCropService.findAll.mockResolvedValue(['crop1', 'crop2'])

      const result = await controller.findAll()
      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(['crop1', 'crop2'])
    })
  })

  describe('findOne', () => {
    it('should call cropService.findOne with correct id', async () => {
      const id = 'some-id'
      mockCropService.findOne.mockResolvedValue('crop')

      const result = await controller.findOne(id)
      expect(service.findOne).toHaveBeenCalledWith(id)
      expect(result).toBe('crop')
    })
  })

  describe('update', () => {
    it('should call cropService.update with correct params', async () => {
      const id = 'update-id'
      const dto: UpdateCropDto = { name: 'Updated Tomato' }
      mockCropService.update.mockResolvedValue('updatedCrop')

      const result = await controller.update(id, dto)
      expect(service.update).toHaveBeenCalledWith(id, dto)
      expect(result).toBe('updatedCrop')
    })
  })

  describe('remove', () => {
    it('should call cropService.remove with correct id', async () => {
      const id = 'delete-id'
      mockCropService.remove.mockResolvedValue('removed')

      const result = await controller.remove(id)
      expect(service.remove).toHaveBeenCalledWith(id)
      expect(result).toBe('removed')
    })
  })
})
