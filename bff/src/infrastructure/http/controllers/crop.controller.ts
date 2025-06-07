import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { CropService } from '@domain/services/crop.service'
import { CreateCropDto } from '@application/dto/crop/create-crop.dto'
import { UpdateCropDto } from '@application/dto/crop/update-crop.dto'
import { CropFindProps } from '@domain/entities/crop.entity'

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}
  @Post()
  create(@Body() crop: CreateCropDto) {
    return this.cropService.create(crop)
  }
  @Get()
  async findAll(): Promise<CropFindProps[]> {
    return await this.cropService.findAll()
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CropFindProps> {
    return this.cropService.findOne(id)
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() crop: UpdateCropDto) {
    return this.cropService.update(id, crop)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropService.remove(id)
  }
}
