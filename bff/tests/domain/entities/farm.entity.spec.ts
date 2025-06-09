import { FarmProps } from '@domain/entities/farm.entity'

describe('FarmProps usage', () => {
  it('should create a valid FarmProps object', () => {
    const farm: FarmProps = {
      name: 'Fazenda São José',
      city: 'Campinas',
      state: 'SP',
      totalArea: 1000,
      cultivatedArea: 600,
      vegetatedArea: 400,
    }

    expect(farm.name).toBe('Fazenda São José')
    expect(farm.totalArea).toBeGreaterThan(0)
    expect(farm.cultivatedArea + farm.vegetatedArea).toBe(farm.totalArea)
  })
})
