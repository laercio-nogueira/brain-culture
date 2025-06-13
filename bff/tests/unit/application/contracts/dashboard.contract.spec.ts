import { DashboardResponseDto } from '@application/contracts/dashboard.contract'

describe('Dashboard DTOs', () => {
  describe('DashboardResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new DashboardResponseDto()
      dto.totalfarms = '10'
      dto.totalarea = '2320'
      dto.totalcultivatedarea = '1200'
      dto.totalvegetatedarea = '900'
      dto.farmByState = [
        { state: 'MG', count: '2' },
        { state: 'SP', count: '1' },
      ]
      dto.cropByFarm = [
        { cropName: 'Milho', farmCount: '2' },
        { cropName: 'Soja', farmCount: '1' },
      ]

      expect(dto.totalfarms).toBeDefined()
      expect(dto.totalarea).toBeDefined()
      expect(dto.totalcultivatedarea).toBeDefined()
      expect(dto.totalvegetatedarea).toBeDefined()
      expect(dto.farmByState).toBeDefined()
      expect(dto.cropByFarm).toBeDefined()
    })
  })
})
