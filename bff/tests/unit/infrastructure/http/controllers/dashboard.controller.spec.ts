import { Test, TestingModule } from '@nestjs/testing'
import { DashboardController } from '@infrastructure/http/controllers/dashboard.controller'
import { DashboardService } from '@domain/services/dashboard.service'
import { DashboardProps } from '@domain/entities/dashboard.entity'
import { Logger } from '@nestjs/common'

describe('DashboardController', () => {
  let controller: DashboardController
  let service: DashboardService

  const mockDashboardService = {
    data: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
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

    controller = module.get<DashboardController>(DashboardController)
    service = module.get<DashboardService>(DashboardService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('data', () => {
    it('should call dashboardService.data and return result', async () => {
      const dashboardData: DashboardProps = {
        totalfarms: '5',
        totalcultivatedarea: '10',
        totalarea: '',
        totalvegetatedarea: '',
        farmByState: [],
        cropByFarm: [],
      }
      mockDashboardService.data.mockResolvedValue(dashboardData)

      const result = await controller.data()

      expect(service.data).toHaveBeenCalled()
      expect(result).toBe(dashboardData)
    })
  })
})
