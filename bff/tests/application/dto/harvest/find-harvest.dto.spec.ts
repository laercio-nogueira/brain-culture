import { FindHarvestDto } from '@application/dto/harvest/find-harvest.dto'

describe('FindHarvestDto', () => {
  it('should create an instance with valid fields', () => {
    const dto = new FindHarvestDto()
    dto.name = 'Safra 2025'
    dto.year = 2025
    dto.farmId = 'uuid-farm-id'

    expect(dto).toBeInstanceOf(FindHarvestDto)
    expect(dto.name).toBe('Safra 2025')
    expect(dto.year).toBe(2025)
    expect(dto.farmId).toBe('uuid-farm-id')
  })
})
