import { FarmerProps } from '@domain/entities/farmer.entity'

describe('FarmerProps structure', () => {
  it('should create a valid FarmerProps object', () => {
    const farmer: FarmerProps = {
      document: '12345678900',
      documentType: 'CPF',
      name: 'João Silva',
    }

    expect(farmer.name).toBe('João Silva')
    expect(farmer.document).toMatch(/^\d+$/)
    expect(farmer.documentType).toBe('CPF')
  })
})
