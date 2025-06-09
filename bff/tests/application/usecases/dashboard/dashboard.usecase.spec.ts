import { Test, TestingModule } from '@nestjs/testing'
import { DashboardUseCase } from '@application/usecases/dashboard/dashboard.usecase'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'

describe('DashboardUseCase', () => {
  let dashboardUseCase: DashboardUseCase
  let farmRepository: jest.Mocked<FarmRepository>

  beforeEach(async () => {
    const farmRepositoryMock = {
      getTotalAreas: jest.fn(),
      getFarmByState: jest.fn(),
      getFarmByCrops: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardUseCase,
        {
          provide: FarmRepository,
          useValue: farmRepositoryMock,
        },
      ],
    }).compile()

    dashboardUseCase = module.get<DashboardUseCase>(DashboardUseCase)
    farmRepository = module.get(FarmRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('data()', () => {
    it('should return combined dashboard data successfully', async () => {
      const mockTotalAreas = {
        totalfarms: '10',
        totalarea: '2320',
        totalcultivatedarea: 1200,
        totalvegetatedarea: 900,
      }

      const mockFarmByState = [
        { state: 'MG', count: '2' },
        { state: 'SP', count: '1' },
      ]

      const mockCropByFarm = [
        { cropName: 'Milho', farmCount: '2' },
        { cropName: 'Soja', farmCount: '1' },
      ]

      farmRepository.getTotalAreas.mockResolvedValue(mockTotalAreas)
      farmRepository.getFarmByState.mockResolvedValue(mockFarmByState)
      farmRepository.getFarmByCrops.mockResolvedValue(mockCropByFarm)

      const result = await dashboardUseCase.data()

      expect(result).toEqual({
        ...mockTotalAreas,
        farmByState: mockFarmByState,
        cropByFarm: mockCropByFarm,
      })

      expect(farmRepository.getTotalAreas).toHaveBeenCalledTimes(1)
      expect(farmRepository.getFarmByState).toHaveBeenCalledTimes(1)
      expect(farmRepository.getFarmByCrops).toHaveBeenCalledTimes(1)
    })

    it('should throw an error when repository fails', async () => {
      const errorMessage = 'Database connection failed'
      farmRepository.getTotalAreas.mockRejectedValue(new Error(errorMessage))

      await expect(dashboardUseCase.data()).rejects.toThrow(
        'Error fetching data from the database',
      )
    })

    it('should handle empty results from repository', async () => {
      farmRepository.getTotalAreas.mockResolvedValue({
        totalfarms: '0',
        totalarea: '0',
        totalcultivatedarea: 0,
        totalvegetatedarea: 0,
      })
      farmRepository.getFarmByState.mockResolvedValue([])
      farmRepository.getFarmByCrops.mockResolvedValue([])

      const result = await dashboardUseCase.data()

      expect(result).toEqual({
        totalfarms: '0',
        totalarea: '0',
        totalcultivatedarea: 0,
        totalvegetatedarea: 0,
        farmByState: [],
        cropByFarm: [],
      })
    })
  })
})
