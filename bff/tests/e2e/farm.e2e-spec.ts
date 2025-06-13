import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { FarmController } from '@infrastructure/http/controllers/farm.controller'
import { FarmService } from '@domain/services/farm.service'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'

describe('FarmController (e2e)', () => {
  let app: INestApplication

  const mockFarmService = {
    create: jest.fn((dto: CreateFarmDto) => ({ id: '1', ...dto })),
    findAll: jest.fn(() => [{ id: '1', name: 'Fazenda Boa Vista', size: 100 }]),
    findOne: jest.fn((id: string) => ({
      id,
      name: 'Fazenda Boa Vista',
      size: 100,
    })),
    update: jest.fn((id: string, dto: UpdateFarmDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, id })),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [{ provide: FarmService, useValue: mockFarmService }, Logger],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/POST farm', async () => {
    const createDto: CreateFarmDto = {
      name: 'Fazenda Boa Vista',
      farmerId: '123',
      city: 'Sao Paulo',
      state: 'SP',
      totalArea: 0,
      cultivatedArea: 0,
      vegetatedArea: 0,
    }

    const response = await request(app.getHttpServer())
      .post('/farm')
      .send(createDto)
      .expect(201)

    expect(response.body).toEqual({ id: '1', ...createDto })
    expect(mockFarmService.create).toHaveBeenCalledWith(createDto)
  })

  it('/GET farm', async () => {
    const response = await request(app.getHttpServer()).get('/farm').expect(200)

    expect(response.body).toEqual([
      { id: '1', name: 'Fazenda Boa Vista', size: 100 },
    ])
    expect(mockFarmService.findAll).toHaveBeenCalled()
  })

  it('/GET farm/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/farm/1')
      .expect(200)

    expect(response.body).toEqual({
      id: '1',
      name: 'Fazenda Boa Vista',
      size: 100,
    })
    expect(mockFarmService.findOne).toHaveBeenCalledWith('1')
  })

  it('/PUT farm/:id', async () => {
    const updateDto: UpdateFarmDto = {
      name: 'Fazenda Atualizada',
      farmerId: '123',
      city: 'Minas Gerais',
      state: 'MG',
      totalArea: 0,
      cultivatedArea: 0,
      vegetatedArea: 0,
    }

    const response = await request(app.getHttpServer())
      .put('/farm/1')
      .send(updateDto)
      .expect(200)

    expect(response.body).toEqual({ id: '1', ...updateDto })
    expect(mockFarmService.update).toHaveBeenCalledWith('1', updateDto)
  })

  it('/DELETE farm/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/farm/1')
      .expect(200)

    expect(response.body).toEqual({ deleted: true, id: '1' })
    expect(mockFarmService.remove).toHaveBeenCalledWith('1')
  })

  afterAll(async () => {
    await app.close()
  })
})
