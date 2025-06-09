import { FarmerRelations } from '@infrastructure/config/relations-config/farmer-relations-config'

describe('FarmerRelations', () => {
  it('should have the expected nested structure', () => {
    expect(FarmerRelations).toEqual({
      farms: {
        harvests: {
          crops: true,
        },
      },
    })
  })

  it('should have farms property', () => {
    expect(FarmerRelations).toHaveProperty('farms')
  })

  it('should have harvests nested inside farms', () => {
    expect(FarmerRelations.farms).toHaveProperty('harvests')
  })

  it('should have crops nested inside harvests and be true', () => {
    expect(FarmerRelations.farms.harvests).toHaveProperty('crops', true)
  })
})
