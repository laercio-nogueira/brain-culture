import { CropEntity } from '@infrastructure/database/entities/crop.entity'

describe('CropEntity', () => {
  it('should create an instance with correct properties', () => {
    const crop = new CropEntity()
    crop.name = 'Milho'
    crop.harvestId = '123e4567-e89b-12d3-a456-426614174000'

    expect(crop).toBeDefined()
    expect(crop.name).toBe('Milho')
    expect(crop.harvestId).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(crop.createdAt).toBeUndefined() // createdAt tem default no banco
    expect(crop.id).toBeUndefined() // id gerado no banco
  })
})
