import {
  FarmResponseDto,
  FarmDeleteResponseDto,
  FarmCreateDto,
} from '@application/contracts/farm.contract'

describe('Farm DTOs', () => {
  describe('FarmResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new FarmResponseDto()
      dto.id = 'fff5c7a4-5d35-4a05-8ec6-31023566b66f'
      dto.name = 'Fazenda Feliz'
      dto.city = 'São Paulo'
      dto.state = 'SP'
      dto.totalArea = 1000
      dto.cultivatedArea = 700
      dto.vegetatedArea = 300
      dto.createdAt = new Date('2023-01-01T00:00:00.000Z')

      expect(dto.id).toBeDefined()
      expect(dto.name).toBeDefined()
      expect(dto.city).toBeDefined()
      expect(dto.state).toBeDefined()
      expect(dto.totalArea).toBeDefined()
      expect(dto.cultivatedArea).toBeDefined()
      expect(dto.vegetatedArea).toBeDefined()
      expect(dto.createdAt).toBeDefined()
    })
  })

  describe('FarmDeleteResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new FarmDeleteResponseDto()
      dto.message = 'Fazenda deletada com sucesso'

      expect(dto.message).toBeDefined()
    })
  })

  describe('FarmCreateDto', () => {
    it('should have the correct properties', () => {
      const dto = new FarmCreateDto()
      dto.name = 'Fazenda Feliz'
      dto.city = 'São Paulo'
      dto.state = 'SP'
      dto.totalArea = 2040
      dto.cultivatedArea = 1900
      dto.vegetatedArea = 100
      dto.farmerId = 1

      expect(dto.name).toBeDefined()
      expect(dto.city).toBeDefined()
      expect(dto.state).toBeDefined()
      expect(dto.totalArea).toBeDefined()
      expect(dto.cultivatedArea).toBeDefined()
      expect(dto.vegetatedArea).toBeDefined()
      expect(dto.farmerId).toBeDefined()
    })
  })
})
