import { Module } from '@nestjs/common';
import { PartController, User2Controller } from './part.controller';
import { PartService, User2Service } from './part.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2 } from './part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User2])],
  controllers: [PartController, User2Controller], 
  providers: [PartService, User2Service],        
})
export class PartModule {}
