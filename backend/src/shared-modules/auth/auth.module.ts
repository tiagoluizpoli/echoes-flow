import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { ClerkGuard } from './access-guards/clerk.guard';
import { ClerkService } from './clerk/clerk.service';
import { WebhooksController } from './controllers/webhooks.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ClerkGuard, ClerkService],
  exports: [ClerkGuard],
  controllers: [WebhooksController],
})
export class AuthModule {}
