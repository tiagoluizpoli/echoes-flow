import { Module } from '@nestjs/common';
import { ChurchRepository, UserRepository } from './repositories';

@Module({
  providers: [UserRepository, ChurchRepository],
  exports: [UserRepository, ChurchRepository],
})
export class DatabaseModule {}
