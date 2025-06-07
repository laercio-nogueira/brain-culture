import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class UpdateFarmerDto {
  @MaxLength(14)
  @IsString()
  @IsNotEmpty()
  document: string

  @MaxLength(2)
  @IsString()
  @IsNotEmpty()
  @IsIn(['PF', 'PJ'], { message: 'documentType must be PF or PJ' })
  documentType: 'PF' | 'PJ'

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string
}
