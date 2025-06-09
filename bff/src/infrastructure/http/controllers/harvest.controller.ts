import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { HarvestService } from '@domain/services/harvest.service'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  HarvestCreateDto,
  HarvestDeleteResponseDto,
  HarvestResponseDto,
} from '@application/contracts/harvest.contract'

@ApiTags('Safra')
@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiBody({ type: HarvestCreateDto })
  create(@Body() harvest: CreateHarvestDto) {
    return this.harvestService.create(harvest)
  }

  @Get()
  @ApiCreatedResponse({ type: [HarvestResponseDto] })
  findAll() {
    return this.harvestService.findAll()
  }

  @Get(':id')
  @ApiCreatedResponse({ type: HarvestResponseDto })
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id)
  }

  @Put(':id')
  @ApiBody({ type: HarvestCreateDto })
  update(@Param('id') id: string, @Body() harvest: UpdateHarvestDto) {
    return this.harvestService.update(id, harvest)
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: HarvestDeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id)
  }
}
