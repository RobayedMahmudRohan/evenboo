import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { OrgEntity } from './org.entity';
import { FunctionEntity } from './function.entity';
import { JwtStrategy } from '../auth-org/jwt.strategy';
import { JwtAuthGuard } from '../auth-org/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OrgEntity, FunctionEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'yourSecretKey',
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [OrgController],
  providers: [OrgService, JwtStrategy, JwtAuthGuard],
  exports: [OrgService, JwtModule],
})
export class OrgModule {}
