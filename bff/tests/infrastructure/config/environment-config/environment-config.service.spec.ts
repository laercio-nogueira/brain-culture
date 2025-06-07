import { Test, TestingModule } from '@nestjs/testing'
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service'
import { ConfigService } from '@nestjs/config'

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<EnvironmentConfigService>(EnvironmentConfigService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getNodeEnv', () => {
    it('should return NODE_ENV value', () => {
      jest.spyOn(configService, 'get').mockReturnValue('test')
      expect(service.getNodeEnv()).toEqual('test')
      expect(configService.get).toHaveBeenCalledWith('NODE_ENV')
    })

    it('should return default value when NODE_ENV is not set', () => {
      jest.spyOn(configService, 'get').mockReturnValue(undefined)
      expect(service.getNodeEnv()).toEqual('development')
    })
  })

  describe('getDatabaseHost', () => {
    it('should return DB_HOST value', () => {
      const mockValue = 'localhost'
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabaseHost()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_HOST')
    })
  })

  describe('getDatabasePort', () => {
    it('should return DB_PORT value', () => {
      const mockValue = 5432
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabasePort()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_PORT')
    })
  })

  describe('getDatabaseUser', () => {
    it('should return DB_USERNAME value', () => {
      const mockValue = 'testuser'
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabaseUser()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_USERNAME')
    })
  })

  describe('getDatabasePassword', () => {
    it('should return DB_PASSWORD value', () => {
      const mockValue = 'testpass'
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabasePassword()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_PASSWORD')
    })
  })

  describe('getDatabaseName', () => {
    it('should return DB_NAME value', () => {
      const mockValue = 'testdb'
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabaseName()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_NAME')
    })
  })

  describe('getDatabaseSchema', () => {
    it('should return DB_SCHEMA value', () => {
      const mockValue = 'public'
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabaseSchema()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_SCHEMA')
    })
  })

  describe('getDatabaseSync', () => {
    it('should return DB_SYNC value', () => {
      const mockValue = true
      jest.spyOn(configService, 'get').mockReturnValue(mockValue)
      expect(service.getDatabaseSync()).toEqual(mockValue)
      expect(configService.get).toHaveBeenCalledWith('DB_SYNC')
    })
  })
})
