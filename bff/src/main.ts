require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  app.enableCors()
  await app.listen(process.env.BACKEND_PORT ?? 3000)
}
bootstrap()
