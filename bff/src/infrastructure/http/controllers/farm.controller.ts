import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { FarmService } from '@domain/services/farm.service'
import { CreateFarmDto } from '@application/dto/farm/create-farm.dto'
import { UpdateFarmDto } from '@application/dto/farm/update-farm.dto'

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  create(@Body() farm: CreateFarmDto) {
    return this.farmService.create(farm)
  }
  @Get()
  findAll() {
    return this.farmService.findAll()
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(id)
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() farm: UpdateFarmDto) {
    return this.farmService.update(id, farm)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmService.remove(id)
  }
}
