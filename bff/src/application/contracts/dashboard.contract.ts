import {
  CropByFarm,
  DashboardProps,
  FarmByState,
} from '@domain/entities/dashboard.entity'
import { ApiProperty } from '@nestjs/swagger'

export class DashboardResponseDto implements DashboardProps {
  @ApiProperty({ example: '10', description: 'Total de fazendas' })
  totalfarms: string

  @ApiProperty({ example: '2320', description: 'Total da area das fazendas' })
  totalarea: string

  @ApiProperty({ example: 1200, description: 'Total da area cultivada' })
  totalcultivatedarea: string

  @ApiProperty({ example: 900, description: 'Total da area com vegetação' })
  totalvegetatedarea: string

  @ApiProperty({
    example: [
      {
        state: 'MG',
        count: '2',
      },
      {
        state: 'SP',
        count: '1',
      },
      {
        state: 'ES',
        count: '1',
      },
    ],
    description: 'Total de fazenda por estado',
  })
  farmByState: FarmByState[]

  @ApiProperty({
    example: [
      {
        cropName: 'Milho',
        farmCount: '2',
      },
      {
        cropName: 'Soja',
        farmCount: '1',
      },
    ],
    description: 'Total de cultivo por fazenda',
  })
  cropByFarm: CropByFarm[]
}
