import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GManModule } from './gmanpower/gman.module';
import { FileParserMiddleware } from './file-parser-middleware';

@Module({
  imports: [GManModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FileParserMiddleware).forRoutes('gman/power');
  }
}