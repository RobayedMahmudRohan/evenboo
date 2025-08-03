import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { OrgModule } from './Organizer/org.module';
import { PartModule } from './Participant/part.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2, User } from './Participant/part.entity'
import { AuthModule } from './auth/auth.module';
import { OrgEntity } from './Organizer/org.entity';

@Module({
  imports: [AdminModule, OrgModule, PartModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'anik123',
    database: 'evenboo',
    entities: [
       User2,
       User,
       OrgEntity
    ],
    synchronize: true,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}