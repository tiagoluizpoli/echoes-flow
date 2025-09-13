import { Module } from '@nestjs/common';
import { ClerkGuard } from './access-guards/clerk.guard';
import { AuthController } from './auth.controller';

@Module({
  providers: [ClerkGuard],
  exports: [ClerkGuard],
  controllers: [AuthController],
})
export class AuthModule {}
