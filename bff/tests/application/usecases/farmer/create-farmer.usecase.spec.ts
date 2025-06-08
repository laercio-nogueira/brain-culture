import { Test, TestingModule } from '@nestjs/testing'
import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { FarmerProps } from '@domain/entities/farmer.entity'
import { HttpException, HttpStatus } from '@nestjs/common'

describe('CreateFarmerUseCase', () => {
  let createFarmerUseCase: CreateFarmerUseCase
  let farmerRepository: FarmerRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFarmerUseCase,
        {
          provide: FarmerRepository,
          useValue: {
            save: jest.fn(),
            findByDocument: jest.fn(),
          },
        },
      ],
    }).compile()

    createFarmerUseCase = module.get<CreateFarmerUseCase>(CreateFarmerUseCase)
    farmerRepository = module.get<FarmerRepository>(FarmerRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    const mockFarmerDto: CreateFarmerDto = {
      name: 'John Doe',
      document: '12345678901',
      documentType: 'PF',
    }

    const mockFarmerProps: FarmerProps = {
      id: '1',
      ...mockFarmerDto,
      createdAt: new Date(),
    }

    it('should create a new farmer when document does not exist', async () => {
      jest.spyOn(farmerRepository, 'findByDocument').mockResolvedValue(null)
      jest
        .spyOn(farmerRepository, 'save')
        .mockResolvedValue(mockFarmerProps as any)

      // Act
      const result = await createFarmerUseCase.execute(mockFarmerDto)

      // Assert
      expect(result).toEqual(mockFarmerProps)
      expect(farmerRepository.findByDocument).toHaveBeenCalledWith(
        mockFarmerDto.document,
      )
      expect(farmerRepository.save).toHaveBeenCalledWith(mockFarmerDto)
    })

    it('should throw CONFLICT exception when farmer with same document already exists', async () => {
      jest
        .spyOn(farmerRepository, 'findByDocument')
        .mockResolvedValue(mockFarmerProps)
      await expect(createFarmerUseCase.execute(mockFarmerDto)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Farmer already exists',
          },
          HttpStatus.CONFLICT,
        ),
      )
      expect(farmerRepository.findByDocument).toHaveBeenCalledWith(
        mockFarmerDto.document,
      )
      expect(farmerRepository.save).not.toHaveBeenCalled()
    })

    it('should rethrow any unexpected error from repository', async () => {
      const error = new Error('Database connection failed')
      jest.spyOn(farmerRepository, 'findByDocument').mockRejectedValue(error)
      await expect(createFarmerUseCase.execute(mockFarmerDto)).rejects.toThrow(
        error,
      )
    })
  })

  describe('verifyFarmerExist', () => {
    const existingDocument = '12345678901'

    it('should not throw when farmer does not exist', async () => {
      jest.spyOn(farmerRepository, 'findByDocument').mockResolvedValue(null)

      await expect(
        createFarmerUseCase['verifyFarmerExist']('new-document'),
      ).resolves.not.toThrow()
    })

    it('should throw CONFLICT exception when farmer exists', async () => {
      const existingFarmer = {
        id: '1',
        document: existingDocument,
      } as FarmerProps
      jest
        .spyOn(farmerRepository, 'findByDocument')
        .mockResolvedValue(existingFarmer)
      await expect(
        createFarmerUseCase['verifyFarmerExist'](existingDocument),
      ).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Farmer already exists',
          },
          HttpStatus.CONFLICT,
        ),
      )
    })
  })
})
