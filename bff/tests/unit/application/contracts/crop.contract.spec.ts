import {
  CropResponseDto,
  CropDeleteResponseDto,
  CropCreateDto,
} from '@application/contracts/crop.contract'

describe('Crop DTOs', () => {
  describe('CropResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new CropResponseDto()
      dto.id = 'fff5c7a4-5d35-4a05-8ec6-31023566b66f'
      dto.name = 'Milho'
      dto.createdAt = new Date('2023-01-01T00:00:00.000Z')

      expect(dto.id).toBeDefined()
      expect(dto.name).toBeDefined()
      expect(dto.createdAt).toBeDefined()
    })
  })

  describe('CropDeleteResponseDto', () => {
    it('should have the correct properties', () => {
      const dto = new CropDeleteResponseDto()
      dto.message = 'Cultivo deletado com sucesso'

      expect(dto.message).toBeDefined()
    })
  })

  describe('CropCreateDto', () => {
    it('should have the correct properties', () => {
      const dto = new CropCreateDto()
      dto.name = 'Milho'

      expect(dto.name).toBeDefined()
    })
  })
})
