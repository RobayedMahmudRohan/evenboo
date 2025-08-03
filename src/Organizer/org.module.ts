import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { OrgEntity } from './org.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgEntity])],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}