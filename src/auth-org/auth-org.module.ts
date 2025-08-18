import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthOrgService } from './auth-org.service';
import { JwtStrategy } from './jwt.strategy';
import { OrgModule } from '../Organizer/org.module'; // to inject OrgService

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'yourSecretKey',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    OrgModule, // needed for JwtStrategy to access OrgService
  ],
  providers: [AuthOrgService, JwtStrategy], // remove JwtOrgStrategy here
  exports: [AuthOrgService],
})
export class AuthOrgModule {}
