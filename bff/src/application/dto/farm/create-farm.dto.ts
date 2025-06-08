import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  IsUUID,
  IsOptional,
  MinLength,
} from 'class-validator'

export class CreateFarmDto {
  @MaxLength(1, {
    message: 'O nome deve ser menor que 100 caracteres',
  })
  @IsString({
    message: 'O nome deve ser uma string',
  })
  @IsNotEmpty()
  name: string

  @MaxLength(1, {
    message: 'A cidade deve tem menor que 100 caracteres',
  })
  @IsString({
    message: 'A cidade deve ser uma string',
  })
  @IsNotEmpty({
    message: 'A cidade é necessaria',
  })
  city: string

  @MinLength(2, {
    message: 'O Estado deve ser uma sigla com 2 caracteres',
  })
  @MaxLength(2, {
    message: 'O Estado deve ser uma sigla com 2 caracteres',
  })
  @IsString()
  @IsNotEmpty({ message: 'O estado é necessario' })
  state: string

  @Min(1, { message: 'Area total deve ser maior que 1' })
  @Max(9999999, { message: 'Area total deve ser menor que 9999999' })
  @IsNumber()
  @IsNotEmpty({ message: 'Area total é necessaria' })
  totalArea: number

  @Min(1, { message: 'Area cultivada deve ser maior que 1' })
  @Max(9999999, { message: 'Area cultivada deve ser menor que 9999999' })
  @IsNumber()
  @IsNotEmpty({ message: 'Area cultivada é necessaria' })
  cultivatedArea: number

  @Min(1, { message: 'Area vegetada deve ser maior que 1' })
  @Max(9999999, { message: 'Area vegetada deve ser menor que 9999999' })
  @IsNumber()
  @IsNotEmpty({ message: 'Area vegetada é necessaria' })
  vegetatedArea: number

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  farmerId?: string | null
}
