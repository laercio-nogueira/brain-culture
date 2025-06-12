import { CropProps, CropFindProps } from '@domain/entities/crop.entity'

describe('CropProps and CropFindProps interfaces', () => {
  it('should allow creating an object matching CropProps', () => {
    const crop: CropProps = {
      id: 'uuid',
      name: 'Milho',
      harvestId: 'harvest-uuid',
      creatAt: new Date(),
    }

    expect(crop.name).toBe('Milho')
  })

  it('should allow creating an object matching CropFindProps', () => {
    const cropFind: CropFindProps = {
      id: 'crop-id',
      name: 'Soja',
    }

    expect(cropFind.name).toBe('Soja')
  })
})
