// area-total-validator.decorator.spec.ts
import { isValidAreaTotal } from '@application/decorators/area-total-validator.decorator'
import { validate, validateOrReject } from 'class-validator'

class TestClass {
  totalArea: number
  cultivatedArea: number
  vegetatedArea: number

  constructor(
    totalArea: number,
    cultivatedArea: number,
    vegetatedArea: number,
  ) {
    this.totalArea = totalArea
    this.cultivatedArea = cultivatedArea
    this.vegetatedArea = vegetatedArea
  }
}

describe('isValidAreaTotal Decorator', () => {
  it('should validate when sum of cultivated and vegetated areas equals total area', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal()
      total: number
    }

    const testCase = new TestCase(1000, 700, 300)
    testCase.total = 1000

    const errors = await validate(testCase)
    expect(errors.length).toBe(0)
  })

  it('should validate when sum of cultivated and vegetated areas is less than total area', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal()
      total: number
    }

    const testCase = new TestCase(1000, 600, 300)
    testCase.total = 1000

    const errors = await validate(testCase)
    expect(errors.length).toBe(0)
  })

  it('should invalidate when sum of cultivated and vegetated areas exceeds total area', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal()
      total: number
    }

    const testCase = new TestCase(1000, 700, 400)
    testCase.total = 1000

    const errors = await validate(testCase)
    expect(errors.length).toBe(1)
    expect(errors[0].constraints.isValidAreaTotal).toBe(
      'A soma da área cultivada (700) e da vegetação (400) excede a área total (1000).',
    )
  })

  it('should work with custom error message', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal({ message: 'Áreas excedem o total permitido' })
      total: number
    }

    const testCase = new TestCase(1000, 800, 300)
    testCase.total = 1000

    try {
      await validateOrReject(testCase)
    } catch (errors) {
      expect(errors[0].constraints.isValidAreaTotal).toBe(
        'Áreas excedem o total permitido',
      )
    }
  })

  it('should handle zero values correctly', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal()
      total: number
    }

    const testCase = new TestCase(0, 0, 0)
    testCase.total = 0

    const errors = await validate(testCase)
    expect(errors.length).toBe(0)
  })

  it('should handle decimal values correctly', async () => {
    class TestCase extends TestClass {
      @isValidAreaTotal()
      total: number
    }

    const testCase = new TestCase(1.5, 0.7, 0.8)
    testCase.total = 1.5

    const errors = await validate(testCase)
    expect(errors.length).toBe(0)
  })
})
