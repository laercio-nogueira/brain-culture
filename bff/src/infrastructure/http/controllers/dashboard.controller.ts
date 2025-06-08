import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { DashboardService } from '@domain/services/dashboard.service'
import { DashboardProps } from '@domain/entities/dashboard.entity'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async data(): Promise<DashboardProps> {
    return await this.dashboardService.data()
  }
}
