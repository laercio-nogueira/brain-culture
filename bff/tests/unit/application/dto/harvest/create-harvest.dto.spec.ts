import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'

describe('CreateHarvestDto', () => {
  it('should be valid', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra de Milho',
      year: new Date().getFullYear(),
      farmId: '9a7c9d28-9a3f-4a3e-a7c0-123456789abc',
    })

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should broken se o nome for vazio', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: '',
      year: 2023,
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'name')).toBe(true)
  })

  it('should broken when the name is longer than 40 characters', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'a'.repeat(41),
      year: 2023,
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'name')).toBe(true)
  })

  it('should broken when the name is lower than 1980', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: 1979,
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'year')).toBe(true)
  })

  it('should broken when the year is higher than current year', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: new Date().getFullYear() + 1,
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'year')).toBe(true)
  })

  it('should broken when the year is not a number', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: 'ano errado',
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'year')).toBe(true)
  })

  it('should transform empty farmId into null', async () => {
    let dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: 2023,
      farmId: '',
    })
    let errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto.farmId).toBeNull()

    dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: 2023,
      farmId: undefined,
    })
    errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto.farmId).toBe(null)
  })

  it('should broken when the farmId is not a valid UUID', async () => {
    const dto = plainToInstance(CreateHarvestDto, {
      name: 'Safra',
      year: 2023,
      farmId: 'id-invalido',
    })

    const errors = await validate(dto)
    expect(errors.some(e => e.property === 'farmId')).toBe(true)
  })
})
