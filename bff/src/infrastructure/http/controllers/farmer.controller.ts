import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { FarmerService } from '@domain/services/farmer.service'
import { CreateFarmerDto } from '@application/dto/farmer/create-farmer.dto'
import { UpdateFarmerDto } from '@application/dto/farmer/update-farmer.dto'

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}
  @Post()
  create(@Body() farmer: CreateFarmerDto) {
    return this.farmerService.create(farmer)
  }
  @Get()
  findAll() {
    return this.farmerService.findAll()
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(id)
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() farmer: UpdateFarmerDto) {
    return this.farmerService.update(id, farmer)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(id)
  }
}
