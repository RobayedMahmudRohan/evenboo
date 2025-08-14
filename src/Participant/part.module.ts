import { Module } from '@nestjs/common';
import { PartController, User2Controller, ProfileController } from './part.controller';
import { PartService, User2Service, ProfileService } from './part.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2, User } from './part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, User2])],
  controllers: [PartController, User2Controller, ProfileController],
  providers: [PartService, User2Service, ProfileService],
})
export class PartModule {}