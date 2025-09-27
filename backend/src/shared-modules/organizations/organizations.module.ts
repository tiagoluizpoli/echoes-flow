import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared-modules/auth/auth.module';
import { OrganizationsController } from './organizations.controller';

@Module({
  imports: [AuthModule],
  controllers: [OrganizationsController],
  providers: [],
})
export class OrganizationsModule {}
