import { Module } from '@nestjs/common';
import { MemberAssociationsRepository, UserRepository } from './repositories';

@Module({
  providers: [UserRepository, MemberAssociationsRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
