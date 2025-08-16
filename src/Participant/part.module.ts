import { Module } from '@nestjs/common';
import { PartController, User2Controller, ProfileController } from './part.controller';
import { PartService, User2Service, ProfileService } from './part.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2, User } from './part.entity';
import { Event } from '../Admin/admin.entity';
import { ParticipantService } from '../Participant/part.service';
import { ParticipantController } from '../Participant/part.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, User2, Event])],
  controllers: [PartController, User2Controller, ProfileController,ParticipantController],
  providers: [PartService, User2Service, ProfileService, ParticipantService],
})
export class PartModule {}