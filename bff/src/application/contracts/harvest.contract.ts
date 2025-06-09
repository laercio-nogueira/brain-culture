import { HarvestProps } from '@domain/entities/harvest.entity'
import { ApiProperty } from '@nestjs/swagger'

export class HarvestResponseDto implements HarvestProps {
  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID da safra',
  })
  id?: string

  @ApiProperty({ example: 'Colheita Principal', description: 'Nome da safra' })
  name: string

  @ApiProperty({ example: 2024, description: 'Ano da colheita' })
  year: number

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação da fazenda',
  })
  createdAt: Date
}

export class HarvestDeleteResponseDto {
  @ApiProperty({
    example: 'Safra deletada com sucesso',
  })
  message: string
}

export class HarvestCreateDto {
  @ApiProperty({ example: 2024, description: 'Ano da colheita' })
  year: number

  @ApiProperty({ example: 'Colheita Principal', description: 'Nome da safra' })
  name: string

  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID da fazenda relacionado à fazenda',
  })
  farmId?: number
}
