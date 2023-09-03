
import { Module } from '@nestjs/common';
import { GManController } from './gman.controller';
import { GManService } from './gman.service';

@Module({
  controllers: [GManController],
  providers: [GManService],
})
export class GManModule {}