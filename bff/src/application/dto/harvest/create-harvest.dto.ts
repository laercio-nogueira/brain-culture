import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
const year = () => new Date().getFullYear()

export class CreateHarvestDto {
  @MaxLength(40, { message: 'O nome deve ser menor que 40 caracteres' })
  @IsString()
  @IsNotEmpty({ message: 'Nome da Safra é necessario' })
  name: string

  @Min(1980, { message: 'Data de criação deve ser maior que 1980' })
  @Max(year(), { message: `Data de criação deve ser menor ou igual ${year()}` })
  @IsNumber()
  @IsNotEmpty({ message: 'Ano da Safra é necessario' })
  year: number

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  farmId?: string
}
