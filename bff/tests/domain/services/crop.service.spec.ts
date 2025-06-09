import { CropService } from '@domain/services/crop.service'
import { CreateCropUseCase } from '@application/usecases/crop/create-crop.usecase'
import { FindCropUseCase } from '@application/usecases/crop/find-crop.usecase'
import { DeleteCropUseCase } from '@application/usecases/crop/delete-crop.usecase'
import { UpdateCropUseCase } from '@application/usecases/crop/update-crop.usecase'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { CropFindProps } from '@domain/entities/crop.entity'

describe('CropService', () => {
  let cropService: CropService
  let createCropUseCase: CreateCropUseCase
  let findCropUseCase: FindCropUseCase
  let deleteCropUseCase: DeleteCropUseCase
  let updateCropUseCase: UpdateCropUseCase

  beforeEach(() => {
    createCropUseCase = {
      execute: jest.fn(),
    } as any

    findCropUseCase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as any

    deleteCropUseCase = {
      execute: jest.fn(),
    } as any

    updateCropUseCase = {
      execute: jest.fn(),
    } as any

    cropService = new CropService(
      createCropUseCase,
      findCropUseCase,
      deleteCropUseCase,
      updateCropUseCase,
    )
  })

  it('should create a crop', async () => {
    const dto: CreateCropDto = { name: 'Milho', harvestId: '123' }
    const result = { id: '1', name: 'Milho' }

    jest.spyOn(createCropUseCase, 'execute').mockResolvedValue(result)

    expect(await cropService.create(dto)).toBe(result)
    expect(createCropUseCase.execute).toHaveBeenCalledWith(dto)
  })

  it('should find all crops', async () => {
    const result: CropFindProps[] = [{ id: '1', name: 'Soja' }]
    jest.spyOn(findCropUseCase, 'findAll').mockResolvedValue(result)

    expect(await cropService.findAll()).toBe(result)
    expect(findCropUseCase.findAll).toHaveBeenCalled()
  })

  it('should find one crop by id', async () => {
    const result: CropFindProps = { id: '1', name: 'Milho' }
    jest.spyOn(findCropUseCase, 'findOne').mockResolvedValue(result)

    expect(await cropService.findOne('1')).toBe(result)
    expect(findCropUseCase.findOne).toHaveBeenCalledWith('1')
  })

  it('should update a crop', async () => {
    const dto: UpdateCropDto = { name: 'Trigo' }
    const updateResult = { affected: 1 }

    jest
      .spyOn(updateCropUseCase, 'execute')
      .mockResolvedValue(updateResult as any)

    expect(await cropService.update('1', dto)).toBe(updateResult)
    expect(updateCropUseCase.execute).toHaveBeenCalledWith('1', dto)
  })

  it('should delete a crop', async () => {
    const result = { message: 'Crop deleted successfully' }

    jest.spyOn(deleteCropUseCase, 'execute').mockResolvedValue(result)

    expect(await cropService.remove('1')).toBe(result)
    expect(deleteCropUseCase.execute).toHaveBeenCalledWith('1')
  })
})
