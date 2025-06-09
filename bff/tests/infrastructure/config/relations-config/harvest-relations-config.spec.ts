import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'

describe('HarvestRelations', () => {
  it('should be defined', () => {
    expect(HarvestRelations).toBeDefined()
  })

  it('should have crops set to true', () => {
    expect(HarvestRelations.crops).toBe(true)
  })
})
