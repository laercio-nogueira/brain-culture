import { Controller, Get } from '@nestjs/common'
import { DashboardService } from '@domain/services/dashboard.service'
import { DashboardProps } from '@domain/entities/dashboard.entity'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { DashboardResponseDto } from '@application/contracts/dashboard.contract'

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiCreatedResponse({ type: DashboardResponseDto })
  async data(): Promise<DashboardProps> {
    return await this.dashboardService.data()
  }
}
