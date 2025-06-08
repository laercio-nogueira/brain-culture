import { IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateCropDto {
  @IsNotEmpty({ message: 'Nome é necessario' })
  @MaxLength(100, {
    message: 'Nome do cultivo deve ter no maximo 14 caracteres',
  })
  name: string

  @IsUUID(4)
  @IsOptional()
  @Transform(({ value }) => (!!value ? value : null))
  harvestId?: string | null
}
