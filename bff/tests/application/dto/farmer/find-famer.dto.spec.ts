import { FindFarmerDto } from '@application/dto/farmer/find-farmer.dto'

describe('FindFarmerDto', () => {
  describe('useMask', () => {
    it('should apply CPF mask correctly for PF documentType', () => {
      const input: FindFarmerDto[] = [
        {
          id: '1',
          name: 'João Silva',
          document: '12345678901',
          documentType: 'PF',
        },
      ]

      const result = FindFarmerDto.useMask(input)

      expect(result[0].document).toBe('123.456.789-01')
    })

    it('should apply CNPJ mask correctly for PJ documentType', () => {
      const input: FindFarmerDto[] = [
        {
          id: '2',
          name: 'Agro S.A.',
          document: '12345678000199',
          documentType: 'PJ',
        },
      ]

      const result = FindFarmerDto.useMask(input)

      expect(result[0].document).toBe('12.345.678/0001-99')
    })

    it('should return original document if documentType is unknown', () => {
      const input: FindFarmerDto[] = [
        {
          id: '3',
          name: 'Fulano',
          document: '00000000000',
          documentType: 'XYZ',
        },
      ]

      const result = FindFarmerDto.useMask(input)

      expect(result[0].document).toBe('00000000000')
    })
  })
})
