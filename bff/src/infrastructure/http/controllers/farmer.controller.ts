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
  Query,
} from '@nestjs/common'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  FarmerCreateDto,
  FarmerDeleteResponseDto,
  FarmerResponseDto,
} from '@application/contracts/farmer.contract'

@ApiTags('Produtor')
@Controller('farmer')
export class FarmerController {
  constructor(
    private readonly farmerService: FarmerService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiBody({ type: FarmerCreateDto })
  create(@Body() farmer: CreateFarmerDto) {
    this.logger.log('Creating farmer')
    return this.farmerService.create(farmer)
  }

  @Get()
  @ApiCreatedResponse({ type: [FarmerResponseDto] })
  findAll(@Query('page') page?, @Query('limit') limit?) {
    return this.farmerService.findAll(+page, +limit)
  }

  @Get(':id')
  @ApiCreatedResponse({ type: FarmerResponseDto })
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: FarmerCreateDto })
  update(@Param('id') id: string, @Body() farmer: UpdateFarmerDto) {
    return this.farmerService.update(id, farmer)
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: FarmerDeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.farmerService.remove(id)
  }
}
