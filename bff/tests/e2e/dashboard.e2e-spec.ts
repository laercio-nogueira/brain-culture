import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { DashboardController } from '@infrastructure/http/controllers/dashboard.controller'
import { DashboardService } from '@domain/services/dashboard.service'
import { DashboardProps } from '@domain/entities/dashboard.entity'

describe('DashboardController (e2e)', () => {
  let app: INestApplication

  const mockDashboardData: DashboardProps = {
    totalfarms: '100',
    totalarea: '1900',
    totalcultivatedarea: '1000',
    totalvegetatedarea: '900',
    farmByState: [],
    cropByFarm: [],
  }

  const mockDashboardService = {
    data: jest.fn().mockResolvedValue(mockDashboardData),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
        Logger,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/GET dashboard', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard')
      .expect(200)

    expect(response.body).toEqual(mockDashboardData)
    expect(mockDashboardService.data).toHaveBeenCalled()
  })

  afterAll(async () => {
    await app.close()
  })
})
