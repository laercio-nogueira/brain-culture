import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { FarmerController } from '@infrastructure/http/controllers/farmer.controller'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'

describe('FarmerController (e2e)', () => {
  let app: INestApplication

  const mockFarmerService = {
    create: jest.fn((dto: CreateFarmerDto) => ({ id: '1', ...dto })),
    findAll: jest.fn((page?: number, limit?: number) => [
      { id: '1', name: 'John Doe' },
    ]),
    findOne: jest.fn((id: string) => ({ id, name: 'John Doe' })),
    update: jest.fn((id: string, dto: UpdateFarmerDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, id })),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        { provide: FarmerService, useValue: mockFarmerService },
        Logger,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/POST farmer', async () => {
    const createDto: CreateFarmerDto = {
      name: 'John Doe',
      document: '12345678900',
      documentType: 'PF',
    }

    const response = await request(app.getHttpServer())
      .post('/farmer')
      .send(createDto)
      .expect(201)

    expect(response.body).toEqual({ id: '1', ...createDto })
    expect(mockFarmerService.create).toHaveBeenCalledWith(createDto)
  })

  it('/GET farmer', async () => {
    const response = await request(app.getHttpServer())
      .get('/farmer?page=1&limit=10')
      .expect(200)

    expect(response.body).toEqual([{ id: '1', name: 'John Doe' }])
    expect(mockFarmerService.findAll).toHaveBeenCalledWith(1, 10)
  })

  it('/GET farmer/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/farmer/1')
      .expect(200)

    expect(response.body).toEqual({ id: '1', name: 'John Doe' })
    expect(mockFarmerService.findOne).toHaveBeenCalledWith('1')
  })

  it('/PUT farmer/:id', async () => {
    const updateDto: UpdateFarmerDto = {
      name: 'Updated Name',
      document: '98765432100',
      documentType: 'PF',
    }

    const response = await request(app.getHttpServer())
      .put('/farmer/1')
      .send(updateDto)
      .expect(200)

    expect(response.body).toEqual({ id: '1', ...updateDto })
    expect(mockFarmerService.update).toHaveBeenCalledWith('1', updateDto)
  })

  it('/DELETE farmer/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/farmer/1')
      .expect(200)

    expect(response.body).toEqual({ deleted: true, id: '1' })
    expect(mockFarmerService.remove).toHaveBeenCalledWith('1')
  })

  afterAll(async () => {
    await app.close()
  })
})
