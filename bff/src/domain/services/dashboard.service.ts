import { Injectable } from '@nestjs/common'
import { DashboardUseCase } from '@application/usecases/dashboard/dashboard.usecase'
import { DashboardProps } from '@domain/entities/dashboard.entity'

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardUseCase: DashboardUseCase) {}

  async data(): Promise<DashboardProps> {
    return await this.dashboardUseCase.data()
  }
}
