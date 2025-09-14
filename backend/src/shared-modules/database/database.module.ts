import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
