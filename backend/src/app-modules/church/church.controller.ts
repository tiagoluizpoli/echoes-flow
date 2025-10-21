import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { Request } from 'express';
import { ClerkGuard } from 'src/shared-modules';
import { ZodValidationInterceptor } from 'src/shared-modules/core';
import { ChurchService } from './church.service';
import {
  type CreateChurchParams,
  createChurchParamsSchema,
} from './models/church';

@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  @UseInterceptors(
    new ZodValidationInterceptor({
      bodySchema: createChurchParamsSchema,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(ClerkGuard)
  async createChurch(@Body() body: CreateChurchParams, @Req() req: Request) {
    await this.churchService.createChurch(body, req.user.userId);
  }
}
