import { FarmerProps } from '@domain/entities/farmer.entity'
import { ApiProperty } from '@nestjs/swagger'

export class FarmerResponseDto implements FarmerProps {
  @ApiProperty({
    example: 'fff5c7a4-5d35-4a05-8ec6-31023566b66f',
    description: 'ID do produtor',
  })
  id?: string

  @ApiProperty({ example: 'Jose da Silva', description: 'Nome do produtor' })
  name: string

  @ApiProperty({
    example: '123.456.789-10',
    description: 'Documento do produtor',
  })
  document: string

  @ApiProperty({
    example: 'PF ou PJ',
    description: 'Tipo de documento do produtor',
  })
  documentType: string

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação do produtor',
  })
  createdAt?: Date
}

export class FarmerDeleteResponseDto {
  @ApiProperty({
    example: 'Produtor deletado com sucesso',
  })
  message: string
}

export class FarmerCreateDto {
  @ApiProperty({
    example: '123.456.789-10',
    description: 'Documento do produtor',
  })
  document: string

  @ApiProperty({
    example: 'PF ou PJ',
    description: 'Tipo de documento do produtor',
  })
  documentType: string

  @ApiProperty({ example: 'Jose da Silva', description: 'Nome do produtor' })
  name: string
}
