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
import { isValidAreaTotal } from '../../decorators/area-total-validator.decorator'

export class CreateFarmDto {
  @MaxLength(100, {
    message: 'O nome deve ser menor que 100 caracteres',
  })
  @IsString({
    message: 'O nome deve ser uma string',
  })
  @IsNotEmpty()
  name: string

  @MaxLength(100, {
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
  @IsString({
    message: 'O Estado deve ser uma string',
  })
  @IsNotEmpty({ message: 'O estado é necessario' })
  state: string

  @Min(1, { message: 'Area total deve ser maior que 1' })
  @Max(9999999, { message: 'Area total deve ser menor que 9999999' })
  @IsNumber({}, { message: 'Area total deve ser um numero' })
  @IsNotEmpty({ message: 'Area total é necessaria' })
  @isValidAreaTotal()
  totalArea: number

  @Min(1, { message: 'Area cultivada deve ser maior que 1' })
  @Max(9999999, { message: 'Area cultivada deve ser menor que 9999999' })
  @IsNumber({}, { message: 'Area cultivada deve ser um numero' })
  @IsNotEmpty({ message: 'Area cultivada é necessaria' })
  cultivatedArea: number

  @Min(1, { message: 'Area vegetada deve ser maior que 1' })
  @Max(9999999, { message: 'Area vegetada deve ser menor que 9999999' })
  @IsNumber({}, { message: 'Area vegetada deve ser um numero' })
  @IsNotEmpty({ message: 'Area vegetada é necessaria' })
  vegetatedArea: number

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  farmerId?: string | null
}
