// harvest.contract.spec.ts
import {
  HarvestResponseDto,
  HarvestDeleteResponseDto,
  HarvestCreateDto,
} from '@application/contracts/harvest.contract'

describe('Harvest DTOs', () => {
  describe('HarvestResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new HarvestResponseDto()
      dto.id = 'fff5c7a4-5d35-4a05-8ec6-31023566b66f'
      dto.name = 'Colheita Principal'
      dto.year = 2024
      dto.createdAt = new Date('2023-01-01T00:00:00.000Z')

      expect(dto.id).toBeDefined()
      expect(dto.name).toBeDefined()
      expect(dto.year).toBeDefined()
      expect(dto.createdAt).toBeDefined()
    })
  })

  describe('HarvestDeleteResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new HarvestDeleteResponseDto()
      dto.message = 'Safra deletada com sucesso'

      expect(dto.message).toBeDefined()
    })
  })

  describe('HarvestCreateDto', () => {
    it('should have the correct properties', () => {
      const dto = new HarvestCreateDto()
      dto.year = 2024
      dto.name = 'Colheita Principal'
      dto.farmId = 1

      expect(dto.year).toBeDefined()
      expect(dto.name).toBeDefined()
      expect(dto.farmId).toBeDefined()
    })
  })
})
