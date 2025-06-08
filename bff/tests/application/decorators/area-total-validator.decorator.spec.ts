import { validate } from 'class-validator'
import { isValidAreaTotal } from '@application/decorators/area-total-validator.decorator'

class AreaDTO {
  constructor(total: number, cultivated: number, vegetated: number) {
    this.totalArea = total
    this.cultivatedArea = cultivated
    this.vegetatedArea = vegetated
  }

  totalArea: number
  cultivatedArea: number
  vegetatedArea: number

  @isValidAreaTotal({
    message:
      'The sum of cultivated and vegetated areas must not exceed the total area.',
  })
  validateTrigger: any
}

describe('isValidAreaTotal Decorator', () => {
  it('should be valid when the sum is equal to the total area', async () => {
    const dto = new AreaDTO(100, 60, 40)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be valid when the sum is less than the total area', async () => {
    const dto = new AreaDTO(100, 30, 20)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be invalid when the sum exceeds the total area', async () => {
    const dto = new AreaDTO(100, 70, 50)
    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints).toHaveProperty(
      'isValidAreaTotal',
      'The sum of cultivated and vegetated areas must not exceed the total area.',
    )
  })
})
