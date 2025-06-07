import { IsNotEmpty } from 'class-validator'

export class UpdateCropDto {
  @IsNotEmpty()
  name: string
}
