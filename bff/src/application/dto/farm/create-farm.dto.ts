import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
import { isUUID } from 'class-validator'

export class CreateFarmDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  city: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  state: string

  @Min(1, { message: 'must be longer than 1' })
  @Max(9999999, { message: 'must be shorter than 9999999' })
  @IsNumber()
  @IsNotEmpty()
  totalArea: number

  @Min(1, { message: 'must be longer than 1' })
  @Max(9999999, { message: 'must be shorter than 9999999' })
  @IsNumber()
  @IsNotEmpty()
  cultivatedArea: number

  @Min(1, { message: 'must be longer than 1' })
  @Max(9999999, { message: 'must be shorter than 9999999' })
  @IsNumber()
  @IsNotEmpty()
  vegetatedArea: number

  farmerId?: string
}
