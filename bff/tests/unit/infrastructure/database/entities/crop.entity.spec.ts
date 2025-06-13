import { CropEntity } from '@infrastructure/database/entities/crop.entity'
import { FarmEntity } from '@infrastructure/database/entities/farm.entity'
import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'
import { HarvestEntity } from '@infrastructure/database/entities/harvest.entity'
import { DataSource } from 'typeorm'

describe('CropEntity with relation to HarvestEntity', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [CropEntity, HarvestEntity, FarmEntity, FarmerEntity],
    })
    await dataSource.initialize()
  })

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
    }
  })

  it('should persist crop with relation to harvest', async () => {
    const farmerRepo = dataSource.getRepository(FarmerEntity)
    const farmRepo = dataSource.getRepository(FarmEntity)
    const harvestRepo = dataSource.getRepository(HarvestEntity)
    const cropRepo = dataSource.getRepository(CropEntity)

    const farmer = farmerRepo.create({
      name: 'João Silva',
      document: '12345678900',
      documentType: 'CPF',
    })
    await farmerRepo.save(farmer)

    const farm = farmRepo.create({
      name: 'Fazenda Boa Esperança',
      city: 'Cuiabá',
      state: 'MT',
      totalArea: 100,
      cultivatedArea: 60,
      vegetatedArea: 30,
      farmer,
    })
    await farmRepo.save(farm)

    const harvest = harvestRepo.create({
      name: 'Safra 2024',
      year: 2024,
      farm,
    })
    await harvestRepo.save(harvest)

    const crop = cropRepo.create({
      name: 'Milho',
      harvest,
    })
    await cropRepo.save(crop)

    const loadedCrop = await cropRepo.findOne({
      where: { id: crop.id },
      relations: ['harvest', 'harvest.farm', 'harvest.farm.farmer'],
    })

    expect(loadedCrop).toBeDefined()
    expect(loadedCrop?.name).toBe('Milho')
    expect(loadedCrop?.harvest?.name).toBe('Safra 2024')
    expect(loadedCrop?.harvest?.year).toBe(2024)
    expect(loadedCrop?.harvest?.farm?.name).toBe('Fazenda Boa Esperança')
    expect(loadedCrop?.harvest?.farm?.farmer?.name).toBe('João Silva')
  })
})
