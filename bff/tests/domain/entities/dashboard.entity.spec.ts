import { DashboardProps } from '@domain/entities/dashboard.entity'

describe('DashboardProps usage', () => {
  it('should create a valid DashboardProps object', () => {
    const dashboard: DashboardProps = {
      totalfarms: '10',
      totalarea: '1000',
      totalcultivatedarea: '600',
      totalvegetatedarea: '400',
      farmByState: [
        { state: 'SP', count: '5' },
        { state: 'MG', count: '5' },
      ],
      cropByFarm: [
        { cropName: 'Milho', farmCount: '6' },
        { cropName: 'Soja', farmCount: '4' },
      ],
    }

    expect(dashboard.totalfarms).toBe('10')
    expect(dashboard.farmByState.length).toBe(2)
    expect(dashboard.cropByFarm[0].cropName).toBe('Milho')
  })
})
