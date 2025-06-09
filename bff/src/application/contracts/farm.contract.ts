import { FarmProps } from '@domain/entities/farm.entity'
import { ApiProperty } from '@nestjs/swagger'

export class FarmResponseDto implements FarmProps {
  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID da fazenda',
  })
  id: string

  @ApiProperty({ example: 'Fazenda Feliz', description: 'Nome da fazenda' })
  name: string

  @ApiProperty({ example: 'São Paulo', description: 'Cidade da fazenda' })
  city: string

  @ApiProperty({
    example: 'SP',
    description: 'Estado da fazenda (2 caracteres)',
  })
  state: string

  @ApiProperty({ example: 1000, description: 'Área total em hectares' })
  totalArea: number

  @ApiProperty({ example: 700, description: 'Área cultivada em hectares' })
  cultivatedArea: number

  @ApiProperty({ example: 300, description: 'Área com vegetação em hectares' })
  vegetatedArea: number

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação da fazenda',
  })
  createdAt: Date
}

export class FarmDeleteResponseDto {
  @ApiProperty({
    example: 'Fazenda deletada com sucesso',
  })
  message: string
}

export class FarmCreateDto {
  @ApiProperty({ example: 'Fazenda Feliz', description: 'Nome da fazenda' })
  name: string

  @ApiProperty({ example: 'São Paulo', description: 'Cidade da fazenda' })
  city: string

  @ApiProperty({ example: 'SP', description: 'Estado da fazenda' })
  state: string

  @ApiProperty({
    example: 2040,
    description: 'Area total da fazenda',
  })
  totalArea: number

  @ApiProperty({
    example: 1900,
    description: 'Area cultivada da fazenda',
  })
  cultivatedArea: number

  @ApiProperty({
    example: 100,
    description: 'Area com vegetação da fazenda',
  })
  vegetatedArea: number

  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID do produtor relacionado à fazenda',
  })
  farmerId?: number
}
