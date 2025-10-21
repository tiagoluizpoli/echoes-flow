import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';

export const setupGlobalFilters = (app: INestApplication<any>) => {
  // const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
};
