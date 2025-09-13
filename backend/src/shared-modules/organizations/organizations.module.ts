import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared-modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class OrganizationsModule {}
