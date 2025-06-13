import { FindFarmDto } from '@application/dto/farm/find-farm.dto'

describe('FindFarmDto', () => {
  it('should create an instance with correct properties', () => {
    const dto = new FindFarmDto()
    dto.id = '123'
    dto.name = 'Farm Name'
    dto.document = '123456789'
    dto.documentType = 'CPF'

    expect(dto).toBeDefined()
    expect(dto.id).toBe('123')
    expect(dto.name).toBe('Farm Name')
    expect(dto.document).toBe('123456789')
    expect(dto.documentType).toBe('CPF')
  })

  it('should allow id to be undefined', () => {
    const dto = new FindFarmDto()
    dto.name = 'Farm Name'
    dto.document = '123456789'
    dto.documentType = 'CPF'

    expect(dto.id).toBeUndefined()
    expect(dto.name).toBe('Farm Name')
  })
})
