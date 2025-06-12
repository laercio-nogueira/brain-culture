import { FarmRelations } from '@infrastructure/config/relations-config/farm-relations-config'

describe('FarmRelations', () => {
  it('should have the expected nested structure', () => {
    expect(FarmRelations).toEqual({
      harvests: {
        crops: true,
      },
    })
  })

  it('should have harvests property', () => {
    expect(FarmRelations).toHaveProperty('harvests')
  })

  it('should have crops nested inside harvests and be true', () => {
    expect(FarmRelations.harvests).toHaveProperty('crops', true)
  })
})
