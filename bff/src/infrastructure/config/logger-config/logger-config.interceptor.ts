import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { Logger } from 'winston'
import { Observable } from 'rxjs'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest())
    return next.handle()
  }

  private log(req) {
    const body = { ...req.body }
    const user = (req as any).user
    this.logger.info(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        method: req.method,
        route: req.route.path,
        data: {
          body: JSON.stringify(body),
          query: req.query,
          params: req.params,
          user,
        },
      }),
    )
  }
}
