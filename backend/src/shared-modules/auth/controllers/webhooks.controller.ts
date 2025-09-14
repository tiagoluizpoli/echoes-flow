import { WebhookEvent } from '@clerk/clerk-sdk-node';
import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  Post,
  type RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ClerkService } from '../clerk/clerk.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly clerkService: ClerkService) {}

  @Post('/clerk')
  @HttpCode(201)
  async handleClerkWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Req() req: RawBodyRequest<any>,
  ) {
    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new BadRequestException('Missing svix headers');
    }

    const body = req.rawBody;

    if (!body) {
      throw new BadRequestException('Request body empty');
    }

    try {
      const event: WebhookEvent = (await this.clerkService.verifyWebhook(
        body,
        svixId,
        svixTimestamp,
        svixSignature,
      )) as WebhookEvent;

      await this.clerkService.syncUser({
        event,
      });

      return { reveived: true };
    } catch (error) {
      console.error('Error handling webhook', error);
      return { reveived: false };
    }
  }
}
