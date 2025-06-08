import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class UpdateCropDto {
  @IsNotEmpty()
  name: string

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  harvestId?: string | null
}
