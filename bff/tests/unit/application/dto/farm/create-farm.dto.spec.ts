import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'

describe('CreateFarmDto', () => {
  const validDto = {
    name: 'Farm 01',
    city: 'Porto Alegre',
    state: 'RS',
    totalArea: 1000,
    cultivatedArea: 600,
    vegetatedArea: 400,
    farmerId: '550e8400-e29b-41d4-a716-446655440000',
  }

  it('should be valid with all correct fields', async () => {
    const dto = plainToInstance(CreateFarmDto, validDto)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be invalid if total area is less than sum of cultivated and vegetated areas', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      totalArea: 900,
    })
    const errors = await validate(dto)
    const areaError = errors.find(e => e.property === 'totalArea')
    expect(areaError).toBeDefined()
    expect(areaError?.constraints).toHaveProperty('isValidAreaTotal')
  })

  it('should be invalid with missing required fields', async () => {
    const dto = plainToInstance(CreateFarmDto, {})
    const errors = await validate(dto)
    const fields = [
      'name',
      'city',
      'state',
      'totalArea',
      'cultivatedArea',
      'vegetatedArea',
    ]
    fields.forEach(field => {
      expect(errors.find(e => e.property === field)).toBeDefined()
    })
  })

  it('should be invalid if state has more than 2 characters', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      state: 'RGS',
    })
    const errors = await validate(dto)
    const stateError = errors.find(e => e.property === 'state')
    expect(stateError?.constraints).toHaveProperty('maxLength')
  })

  it('should transform empty farmerId into null', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      farmerId: '',
    })
    expect(dto.farmerId).toBeNull()
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be invalid if name is longer than 100 characters', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      name: 'a'.repeat(101),
    })
    const errors = await validate(dto)
    const nameError = errors.find(e => e.property === 'name')
    expect(nameError?.constraints).toHaveProperty('maxLength')
  })

  it('should be invalid if totalArea is not a number', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      totalArea: 'not-a-number',
    } as any)
    const errors = await validate(dto)
    const totalAreaError = errors.find(e => e.property === 'totalArea')
    expect(totalAreaError?.constraints).toHaveProperty('isNumber')
  })

  it('should be invalid if cultivatedArea or vegetatedArea is zero or negative', async () => {
    const dto = plainToInstance(CreateFarmDto, {
      ...validDto,
      cultivatedArea: 0,
      vegetatedArea: -10,
    })
    const errors = await validate(dto)
    const cultivatedError = errors.find(e => e.property === 'cultivatedArea')
    const vegetatedError = errors.find(e => e.property === 'vegetatedArea')

    expect(cultivatedError?.constraints).toHaveProperty('min')
    expect(vegetatedError?.constraints).toHaveProperty('min')
  })
})
