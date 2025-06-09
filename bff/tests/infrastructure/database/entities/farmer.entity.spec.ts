import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'

describe('FarmerEntity', () => {
  it('should create an instance with correct properties', () => {
    const farmer = new FarmerEntity()
    farmer.document = '12345678900'
    farmer.documentType = 'CPF'
    farmer.name = 'João Silva'

    expect(farmer).toBeDefined()
    expect(farmer.document).toBe('12345678900')
    expect(farmer.documentType).toBe('CPF')
    expect(farmer.name).toBe('João Silva')
    expect(farmer.createdAt).toBeUndefined()
    expect(farmer.id).toBeUndefined()
    expect(farmer.farms).toBeUndefined()
  })
})
