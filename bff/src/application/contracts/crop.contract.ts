import { CropProps } from '@domain/entities/crop.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CropResponseDto implements CropProps {
  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID do cultivo',
  })
  id?: string

  @ApiProperty({ example: 'Milho', description: 'Nome da item cultivado' })
  name: string

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação da fazenda',
  })
  createdAt: Date
}

export class CropDeleteResponseDto {
  @ApiProperty({
    example: 'Cultivo deletado com sucesso',
  })
  message: string
}

export class CropCreateDto {
  @ApiProperty({ example: 'Milho', description: 'Nome da item cultivado' })
  name: string
}
