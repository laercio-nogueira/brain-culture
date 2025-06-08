import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateCropDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsUUID(4)
  harvestId: string

  createdAt?: Date
}
