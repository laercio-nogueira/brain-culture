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
import { CropService } from '@domain/services/crop.service'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { CropFindProps } from '@domain/entities/crop.entity'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  CropCreateDto,
  CropDeleteResponseDto,
  CropResponseDto,
} from '@application/contracts/crop.contract'

@ApiTags('Cultivo')
@Controller('crop')
export class CropController {
  constructor(
    private readonly cropService: CropService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiBody({ type: CropCreateDto })
  create(@Body() crop: CreateCropDto) {
    return this.cropService.create(crop)
  }
  @Get()
  @ApiCreatedResponse({ type: [CropResponseDto] })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.cropService.findAll(page, limit)
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CropResponseDto })
  async findOne(@Param('id') id: string): Promise<CropFindProps> {
    return this.cropService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: CropCreateDto })
  @ApiCreatedResponse({ type: CropResponseDto })
  update(@Param('id') id: string, @Body() crop: UpdateCropDto) {
    return this.cropService.update(id, crop)
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CropDeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.cropService.remove(id)
  }
}
