import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/admin.module';
import { OrgModule } from './Organizer/org.module';
import { PartModule } from './Participant/part.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User2, User } from './Participant/part.entity';
import { AuthModule } from './auth/auth.module';
import { OrgEntity } from './Organizer/org.entity';
import { Organizer } from './Admin/admin.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
dotenv.config();


const sendGridApiKey = process.env.SENDGRID_API_KEY;

@Module({
  imports: [
    AdminModule,
    OrgModule,
    PartModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'anik123',
      database: 'evenboo',
      entities: [User2, User, OrgEntity, Organizer],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // MailerModule integration
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net', // SendGrid example
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'apikey',
          pass: sendGridApiKey,
        },
      },
      defaults: {
        from: '"EvenBoo" <evenboo121@gmail.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
