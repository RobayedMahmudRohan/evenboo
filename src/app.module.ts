import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { OrgModule } from './Organizer/org.module';

@Module({
  imports: [AdminModule, OrgModule],
})
export class AppModule {}
  