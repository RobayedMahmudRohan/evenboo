import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, Event,Organizer } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Admin, Event,Organizer])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
