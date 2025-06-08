import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'

describe('CreateCropDto', () => {
  it('should be valid when name and harvestId are correct', async () => {
    const input = {
      name: 'Tomato Crop',
      harvestId: '550e8400-e29b-41d4-a716-446655440000',
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be valid when harvestId is missing (optional)', async () => {
    const input = {
      name: 'Corn Crop',
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be valid when harvestId is an empty string (transformed to null)', async () => {
    const input = {
      name: 'Soy Crop',
      harvestId: '',
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    expect(dto.harvestId).toBeNull()
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be invalid when name is missing', async () => {
    const input = {
      harvestId: '550e8400-e29b-41d4-a716-446655440000',
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('name')
  })

  it('should be invalid when name exceeds 100 characters', async () => {
    const longName = 'A'.repeat(101)
    const input = {
      name: longName,
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('name')
    expect(errors[0].constraints).toHaveProperty(
      'maxLength',
      'Nome do cultivo deve ter no maximo 14 caracteres',
    )
  })

  it('should be invalid when harvestId is not a valid UUID', async () => {
    const input = {
      name: 'Rice Crop',
      harvestId: 'not-a-uuid',
    }

    const dto: any = plainToInstance(CreateCropDto, input)
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].property).toBe('harvestId')
  })
})
