import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { OrgModule } from './Organizer/org.module';
import { PartModule } from './Participant/part.module';

@Module({
  imports: [AdminModule, OrgModule, PartModule],
})
export class AppModule {}
