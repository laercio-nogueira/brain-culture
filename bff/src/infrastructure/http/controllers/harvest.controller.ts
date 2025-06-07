import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { HarvestService } from '@domain/services/harvest.service'
import { CreateHarvestDto } from '@application/dto/harvest/create-harvest.dto'
import { UpdateHarvestDto } from '@application/dto/harvest/update-harvest.dto'

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}
  @Post()
  create(@Body() harvest: CreateHarvestDto) {
    return this.harvestService.create(harvest)
  }
  @Get()
  findAll() {
    return this.harvestService.findAll()
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id)
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() harvest: UpdateHarvestDto) {
    return this.harvestService.update(id, harvest)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id)
  }
}
