import { FindHarvestUseCase } from '@application/usecases/harvest/find-harvest.usecase'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { FindHarvestDto } from '@application/dto/harvest/find-harvest.dto'
import { HarvestRelations } from '@infrastructure/config/relations-config/harvest-relations-config'

const mockHarvestRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
})

describe('FindHarvestUseCase', () => {
  let useCase: FindHarvestUseCase
  let repository: jest.Mocked<HarvestRepository>

  const mockHarvest: FindHarvestDto = {
    name: 'Safra Verão',
    year: 2024,
  }

  beforeEach(() => {
    repository = mockHarvestRepository() as any
    useCase = new FindHarvestUseCase(repository)
  })

  it('should return a harvest by id', async () => {
    repository.findOne.mockResolvedValue(mockHarvest as any)

    const result = await useCase.findOne('harvest-id-1')

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 'harvest-id-1' },
    })
    expect(result).toEqual(mockHarvest)
  })

  it('should return all harvests with relations', async () => {
    const mock = [
      [
        {
          name: 'Safra Verão',
          year: 2024,
        },
      ],
      10,
    ]
    repository.findAndCount.mockResolvedValue(mock as any)

    const result = await useCase.findAll(undefined, 10)

    expect(repository.findAndCount).toHaveBeenCalledWith({
      relations: HarvestRelations,
    })
    expect(result).toEqual({
      data: [{ name: 'Safra Verão', year: 2024 }],
      total: 10,
    })
  })

  it('should throw if findOne throws', async () => {
    const error = new Error('DB error')
    repository.findOne.mockRejectedValue(error)

    await expect(useCase.findOne('harvest-id-1')).rejects.toThrow('DB error')
  })

  it('should throw if findAll throws', async () => {
    const error = new Error('DB error')
    repository.findAndCount.mockRejectedValue(error)

    await expect(useCase.findAll(undefined, undefined)).rejects.toThrow(
      'DB error',
    )
  })

  describe('findAll', () => {
    let useCase: FindHarvestUseCase
    let harvestRepository: Partial<HarvestRepository>

    beforeEach(() => {
      harvestRepository = {
        findOne: jest.fn(),
        findAndCount: jest.fn(),
      }
      useCase = new FindHarvestUseCase(harvestRepository as HarvestRepository)
    })

    it('should include page and limit in options when page is defined', async () => {
      const mockHarvests = [
        { name: 'Safra 2020', year: 2020 },
      ] as FindHarvestDto[]
      const total = 1
      const page = 2
      const limit = 5
      ;(harvestRepository.findAndCount as jest.Mock).mockResolvedValue([
        mockHarvests,
        total,
      ])

      const result = await useCase.findAll(page, limit)

      expect(harvestRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          relations: HarvestRelations,
          skip: (page - 1) * limit,
          take: limit,
        }),
      )
      expect(result).toEqual({
        data: mockHarvests,
        total,
        page,
        limit,
      })
    })

    it('should NOT include page and limit in options when page is undefined', async () => {
      const mockHarvests = [
        { name: 'Safra 2020', year: 2020 },
      ] as FindHarvestDto[]
      const total = 1
      const page = undefined
      const limit = undefined
      ;(harvestRepository.findAndCount as jest.Mock).mockResolvedValue([
        mockHarvests,
        total,
      ])

      const result = await useCase.findAll(page as any, limit as any)

      expect(harvestRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ relations: { crops: true } }),
      )

      expect(result).toEqual({
        data: mockHarvests,
        total,
      })
    })
  })
})
