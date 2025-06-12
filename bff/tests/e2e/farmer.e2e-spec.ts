import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { FarmerService } from '@domain/services/farmer.service'
import { INestApplication } from '@nestjs/common'

describe('Farmer (e2e)', () => {
  let app: INestApplication
  let farmerService = { findAll: () => ['test'] }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FarmerService)
      .useValue(farmerService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET farmers`, () => {
    return request(app.getHttpServer()).get('/farmers').expect(200).expect({
      data: farmerService.findAll(),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
