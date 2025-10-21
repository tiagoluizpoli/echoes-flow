import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared-modules';
import { AuthModule } from 'src/shared-modules/auth/auth.module';
import { ChurchController } from './church.controller';
import { ChurchService } from './church.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [ChurchController],
  providers: [ChurchService],
})
export class ChurchModule {}
