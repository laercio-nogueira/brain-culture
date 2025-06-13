import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { CropController } from '@infrastructure/http/controllers/crop.controller'
import { CropService } from '@domain/services/crop.service'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'

describe('CropController (e2e)', () => {
  let app: INestApplication

  const mockCropService = {
    create: jest.fn((dto: CreateCropDto) => ({ id: '1', ...dto })),
    findAll: jest.fn((page?: number, limit?: number) => [
      { id: '1', name: 'Milho' },
    ]),
    findOne: jest.fn((id: string) => ({
      id,
      name: 'Milho',
    })),
    update: jest.fn((id: string, dto: UpdateCropDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: string) => ({ deleted: true, id })),
  }

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [{ provide: CropService, useValue: mockCropService }, Logger],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/POST crop', async () => {
    const createDto: CreateCropDto = {
      name: 'Milho',
    }

    const response = await request(app.getHttpServer())
      .post('/crop')
      .send(createDto)
      .expect(201)

    expect(response.body).toEqual({ id: '1', ...createDto })
    expect(mockCropService.create).toHaveBeenCalledWith(createDto)
  })

  it('/GET crop', async () => {
    const response = await request(app.getHttpServer())
      .get('/crop?page=1&limit=10')
      .expect(200)

    expect(response.body).toEqual([{ id: '1', name: 'Milho' }])
    expect(mockCropService.findAll).toHaveBeenCalledWith('1', '10')
  })

  it('/GET crop/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/crop/1')
      .expect(200)

    expect(response.body).toEqual({
      id: '1',
      name: 'Milho',
    })
    expect(mockCropService.findOne).toHaveBeenCalledWith('1')
  })

  it('/PUT crop/:id', async () => {
    const updateDto: UpdateCropDto = {
      name: 'Milho Atualizado',
    }

    const response = await request(app.getHttpServer())
      .put('/crop/1')
      .send(updateDto)
      .expect(200)

    expect(response.body).toEqual({ id: '1', ...updateDto })
    expect(mockCropService.update).toHaveBeenCalledWith('1', updateDto)
  })

  it('/DELETE crop/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/crop/1')
      .expect(200)

    expect(response.body).toEqual({ deleted: true, id: '1' })
    expect(mockCropService.remove).toHaveBeenCalledWith('1')
  })

  afterAll(async () => {
    await app.close()
  })
})
