import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChurchModule } from './app-modules/church';
import { AuthModule, DatabaseModule } from './shared-modules';
import { CoreModule } from './shared-modules/core/core.module';

@Module({
  imports: [AuthModule, ChurchModule, DatabaseModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
