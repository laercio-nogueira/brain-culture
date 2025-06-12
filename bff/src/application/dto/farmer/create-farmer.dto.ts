import { IsCpfOrCnpj } from '@application/decorators/is-cpf-or-cnpj-validator.decorator'
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateFarmerDto {
  id?: string

  @MaxLength(100, {
    message: 'Nome do Produtor, deve ter no maximo 100 caracteres',
  })
  @IsString({ message: 'Nome do Produtor, deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do Produtor, é necessario' })
  name: string

  @MaxLength(14, { message: 'Documento deve ter no maximo 14 caracteres' })
  @IsString({ message: 'Documento do Produtor deve ser uma string' })
  @IsNotEmpty({ message: 'Documento do Produtor, é necessario' })
  @IsCpfOrCnpj('Documento do Produtor, deve ser CPF ou CNPJ valido')
  document: string

  @MaxLength(2)
  @IsString({ message: 'Tipo de documento deve ser uma string' })
  @IsNotEmpty({ message: 'Tipo de documento é necessario' })
  @IsIn(['PF', 'PJ'], { message: 'Tipo de documento deve ser PF ou PJ' })
  documentType: 'PF' | 'PJ'
}
