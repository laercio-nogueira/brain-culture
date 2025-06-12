import { FarmEntity } from '@infrastructure/database/entities/farm.entity'

describe('FarmEntity', () => {
  it('should create an instance with correct properties', () => {
    const farm = new FarmEntity()
    farm.name = 'Fazenda Verde'
    farm.city = 'Campinas'
    farm.state = 'SP'
    farm.totalArea = 1000
    farm.cultivatedArea = 600
    farm.vegetatedArea = 400
    farm.farmerId = '123e4567-e89b-12d3-a456-426614174000'

    expect(farm).toBeDefined()
    expect(farm.name).toBe('Fazenda Verde')
    expect(farm.city).toBe('Campinas')
    expect(farm.state).toBe('SP')
    expect(farm.totalArea).toBe(1000)
    expect(farm.cultivatedArea).toBe(600)
    expect(farm.vegetatedArea).toBe(400)
    expect(farm.farmerId).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(farm.createdAt).toBeUndefined() // criado automaticamente no banco
    expect(farm.id).toBeUndefined() // gerado no banco
    expect(farm.harvests).toBeUndefined() // relação não inicializada
    expect(farm.farmer).toBeUndefined() // relação não inicializada
  })
})
