import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, DatabaseModule } from './shared-modules';
import { CoreModule } from './shared-modules/core/core.module';
import { OrganizationsModule } from './shared-modules/organizations/organizations.module';

@Module({
  imports: [AuthModule, OrganizationsModule, DatabaseModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
