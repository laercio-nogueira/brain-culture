import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { HarvestController } from '@infrastructure/http/controllers/harvest.controller'
import { HarvestService } from '@domain/services/harvest.service'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'

describe('HarvestController (e2e)', () => {
  let app: INestApplication

  const mockHarvestService = {
    create: jest.fn((dto: CreateHarvestDto) => ({ id: '1', ...dto })),
    findAll: jest.fn(() => [
      {
        id: '1',
        name: 'Safra 2024',
        year: 2024,
      },
    ]),
    findOne: jest.fn((id: string) => ({
      id,
      name: 'Safra 2024',
      year: 2024,
    })),
    update: jest.fn((id: string, dto: UpdateHarvestDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, id })),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        { provide: HarvestService, useValue: mockHarvestService },
        Logger,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/POST harvest', async () => {
    const createDto: CreateHarvestDto = {
      name: 'Safra 2024',
      year: 2024,
    }

    const response = await request(app.getHttpServer())
      .post('/harvest')
      .send(createDto)
      .expect(201)

    expect(response.body).toEqual({ id: '1', ...createDto })
    expect(mockHarvestService.create).toHaveBeenCalledWith(createDto)
  })

  it('/GET harvest', async () => {
    const response = await request(app.getHttpServer())
      .get('/harvest')
      .expect(200)

    expect(response.body).toEqual([
      {
        id: '1',
        name: 'Safra 2024',
        year: 2024,
      },
    ])
    expect(mockHarvestService.findAll).toHaveBeenCalled()
  })

  it('/GET harvest/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/harvest/1')
      .expect(200)

    expect(response.body).toEqual({
      id: '1',
      name: 'Safra 2024',
      year: 2024,
    })
    expect(mockHarvestService.findOne).toHaveBeenCalledWith('1')
  })

  it('/PUT harvest/:id', async () => {
    const updateDto: UpdateHarvestDto = {
      name: 'Safra Atualizada',
      year: 2025,
    }

    const response = await request(app.getHttpServer())
      .put('/harvest/1')
      .send(updateDto)
      .expect(200)

    expect(response.body).toEqual({ id: '1', ...updateDto })
    expect(mockHarvestService.update).toHaveBeenCalledWith('1', updateDto)
  })

  it('/DELETE harvest/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/harvest/1')
      .expect(200)

    expect(response.body).toEqual({ deleted: true, id: '1' })
    expect(mockHarvestService.remove).toHaveBeenCalledWith('1')
  })

  afterAll(async () => {
    await app.close()
  })
})
