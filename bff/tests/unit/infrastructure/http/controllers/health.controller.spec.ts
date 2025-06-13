import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from '@infrastructure/http/controllers/health.controller'
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {},
        },
        {
          provide: HttpHealthIndicator,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('check', () => {
    it('should return { message: "OK" }', () => {
      expect(controller.check()).toEqual({ message: 'OK' })
    })
  })
})
