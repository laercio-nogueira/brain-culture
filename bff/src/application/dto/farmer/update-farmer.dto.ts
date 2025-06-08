import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class UpdateFarmerDto {
  @MaxLength(14, { message: 'Documento deve ter no maximo 14 caracteres' })
  @IsString()
  @IsNotEmpty()
  document: string

  @MaxLength(2)
  @IsString()
  @IsNotEmpty()
  @IsIn(['PF', 'PJ'], { message: 'Tipo de documento deve ser PF ou PJ' })
  documentType: 'PF' | 'PJ'

  @MaxLength(255, {
    message: 'Nome do Produtor, deve ter no maximo 255 caracteres',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
