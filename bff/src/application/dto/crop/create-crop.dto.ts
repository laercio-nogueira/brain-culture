import { IsNotEmpty } from 'class-validator'

export class CreateCropDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  harvestId: string

  createdAt?: Date
}
