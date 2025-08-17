import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, Event } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Admin, Event])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
