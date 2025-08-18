import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { OrgService } from '../Organizer/org.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private orgService: OrgService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'yourSecretKey',
    });
  }

  async validate(payload: any) {
    const user = await this.orgService.validateUser(payload.sub);
    if (!user) return null;
    return { userId: user.id, email: user.email }; // this populates req.user
  }
}
