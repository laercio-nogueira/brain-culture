import { DashboardService } from '@domain/services/dashboard.service'
import { DashboardUseCase } from '@application/usecases/dashboard/dashboard.usecase'
import { DashboardProps } from '@domain/entities/dashboard.entity'

describe('DashboardService', () => {
  let dashboardService: DashboardService
  let dashboardUseCase: DashboardUseCase

  beforeEach(() => {
    dashboardUseCase = {
      data: jest.fn(),
    } as any

    dashboardService = new DashboardService(dashboardUseCase)
  })

  it('should return dashboard data', async () => {
    const mockData: DashboardProps = {
      totalfarms: '10',
      totalarea: '1000',
      totalcultivatedarea: '700',
      totalvegetatedarea: '300',
      farmByState: [{ state: 'SP', count: '4' }],
      cropByFarm: [{ cropName: 'Milho', farmCount: '3' }],
    }

    jest.spyOn(dashboardUseCase, 'data').mockResolvedValue(mockData)

    const result = await dashboardService.data()
    expect(result).toBe(mockData)
    expect(dashboardUseCase.data).toHaveBeenCalled()
  })
})
