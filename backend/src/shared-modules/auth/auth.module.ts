import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { RolePermissionsGuard } from './access-guards';
import { ClerkGuard } from './access-guards/clerk.guard';
import { ClerkWebhookService } from './clerk/clerk-webhook.service';
import { WebhooksController } from './controllers/webhooks.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ClerkGuard, RolePermissionsGuard, ClerkWebhookService],
  exports: [ClerkGuard, RolePermissionsGuard],
  controllers: [WebhooksController],
})
export class AuthModule {}
