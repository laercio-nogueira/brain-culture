import { HarvestEntity } from '@infrastructure/database/entities/harvest.entity'

describe('HarvestEntity', () => {
  it('should create an instance with correct properties', () => {
    const harvest = new HarvestEntity()
    harvest.name = 'Safra de Milho'
    harvest.year = 2024
    harvest.farmId = 'uuid-farm-1234'

    expect(harvest).toBeDefined()
    expect(harvest.name).toBe('Safra de Milho')
    expect(harvest.year).toBe(2024)
    expect(harvest.farmId).toBe('uuid-farm-1234')
    expect(harvest.id).toBeUndefined()
    expect(harvest.createdAt).toBeUndefined()
    expect(harvest.farm).toBeUndefined()
    expect(harvest.crops).toBeUndefined()
  })
})
