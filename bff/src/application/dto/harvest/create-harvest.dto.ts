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
  @MaxLength(14)
  @IsString()
  @IsNotEmpty()
  name: string

  @Min(1980, { message: 'must be longer than 1980' })
  @Max(year(), { message: `must be shorter or equal than ${year()}` })
  @IsNumber()
  @IsNotEmpty()
  year: number

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  farmId?: string
}
