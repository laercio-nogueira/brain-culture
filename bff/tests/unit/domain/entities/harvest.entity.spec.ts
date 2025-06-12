import { HarvestProps } from '@domain/entities/harvest.entity'

describe('HarvestProps structure', () => {
  it('should create a valid HarvestProps object', () => {
    const harvest: HarvestProps = {
      name: 'Safra 2025',
      year: 2025,
      farmId: '123',
    }

    expect(harvest.name).toBe('Safra 2025')
    expect(harvest.year).toBe(2025)
    expect(harvest.farmId).toBe('123')
  })
})
