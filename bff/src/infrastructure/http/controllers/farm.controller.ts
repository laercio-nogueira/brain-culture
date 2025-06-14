import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common'
import { FarmService } from '@domain/services/farm.service'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  FarmResponseDto,
  FarmDeleteResponseDto,
  FarmCreateDto,
} from '@application/contracts/farm.contract'

@ApiTags('Fazenda')
@Controller('farm')
export class FarmController {
  constructor(
    private readonly farmService: FarmService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiBody({ type: FarmCreateDto })
  create(@Body() farm: CreateFarmDto) {
    return this.farmService.create(farm)
  }

  @Get()
  @ApiCreatedResponse({ type: [FarmResponseDto] })
  findAll(@Param('page') page?: number, @Param('limit') limit?: number) {
    return this.farmService.findAll(page, limit)
  }

  @Get(':id')
  @ApiCreatedResponse({ type: FarmResponseDto })
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: FarmCreateDto })
  update(@Param('id') id: string, @Body() farm: UpdateFarmDto) {
    return this.farmService.update(id, farm)
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: FarmDeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.farmService.remove(id)
  }
}
