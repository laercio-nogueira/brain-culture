import { Logger, Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { TypeOrmConfigModule } from './infrastructure/config/typeorm-config/typeorm-config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerInterceptor } from '@infrastructure/config/logger-config/logger-config.interceptopr'
import { WinstonModule } from 'nest-winston'
import { winstonConfig } from '@infrastructure/config/logger-config/logger-config'

import { FarmerController } from '@infrastructure/http/controllers/farmer.controller'
import { FarmController } from '@infrastructure/http/controllers/farm.controller'
import { CropController } from '@infrastructure/http/controllers/crop.controller'
import { HarvestController } from '@infrastructure/http/controllers/harvest.controller'
import { DashboardController } from '@infrastructure/http/controllers/dashboard.controller'

import { FarmerService } from '@domain/services/farmer.service'
import { FarmService } from '@domain/services/farm.service'
import { CropService } from '@domain/services/crop.service'
import { HarvestService } from '@domain/services/harvest.service'
import { DashboardService } from '@domain/services/dashboard.service'

import { FarmerRepository } from '@infrastructure/database/repositories/farmer-repository'
import { FarmRepository } from '@infrastructure/database/repositories/farm-repository'
import { CropRepository } from '@infrastructure/database/repositories/crop-repository'

import { FarmerEntity } from '@infrastructure/database/entities/farmer.entity'
import { FarmEntity } from '@infrastructure/database/entities/farm.entity'
import { CropEntity } from '@infrastructure/database/entities/crop.entity'
import { HarvestEntity } from '@infrastructure/database/entities/harvest.entity'

import { CreateFarmerUseCase } from '@application/usecases/farmer/create-farmer.usecase'
import { FindFarmerUseCase } from '@application/usecases/farmer/find-farmer.usecase'
import { UpdateFarmerUseCase } from '@application/usecases/farmer/update-farmer.usecase'
import { DeleteFarmerUseCase } from '@application/usecases/farmer/delete-farmer.usecase'
import { CreateFarmUseCase } from '@application/usecases/farm/create-farm.usecase'
import { FindFarmUseCase } from '@application/usecases/farm/find-farm.usecase'
import { DeleteFarmUseCase } from '@application/usecases/farm/delete-farm.usecase'
import { UpdateFarmUseCase } from '@application/usecases/farm/update-farm.usecase'
import { CreateCropUseCase } from '@application/usecases/crop/create-crop.usecase'
import { FindCropUseCase } from '@application/usecases/crop/find-crop.usecase'
import { DeleteCropUseCase } from '@application/usecases/crop/delete-crop.usecase'
import { UpdateCropUseCase } from '@application/usecases/crop/update-crop.usecase'
import { CreateHarvestUseCase } from '@application/usecases/harvest/create-harvest.usecase'
import { FindHarvestUseCase } from '@application/usecases/harvest/find-harvest.usecase'
import { DeleteHarvestUseCase } from '@application/usecases/harvest/delete-harvest.usecase'
import { UpdateHarvestUseCase } from '@application/usecases/harvest/update-harvest.usecase'
import { HarvestRepository } from '@infrastructure/database/repositories/harvest-repository'
import { DashboardUseCase } from '@application/usecases/dashboard/dashboard.usecase'

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmerEntity]),
    TypeOrmModule.forFeature([FarmEntity]),
    TypeOrmModule.forFeature([CropEntity]),
    TypeOrmModule.forFeature([HarvestEntity]),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [
    FarmerController,
    FarmController,
    CropController,
    HarvestController,
    DashboardController,
  ],
  providers: [
    FarmerRepository,
    FarmRepository,
    CropRepository,
    HarvestRepository,
    CreateFarmerUseCase,
    FindFarmerUseCase,
    ConfigService,
    FarmerService,
    FarmService,
    CropService,
    HarvestService,
    DashboardService,
    UpdateFarmerUseCase,
    DeleteFarmerUseCase,
    CreateFarmUseCase,
    FindFarmUseCase,
    DeleteFarmUseCase,
    UpdateFarmUseCase,
    CreateCropUseCase,
    FindCropUseCase,
    DeleteCropUseCase,
    UpdateCropUseCase,
    CreateHarvestUseCase,
    FindHarvestUseCase,
    DeleteHarvestUseCase,
    UpdateHarvestUseCase,
    DashboardUseCase,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {}
}
