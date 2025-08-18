import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthOrgService {
  constructor(private jwtService: JwtService) {}

  async login(organizer: any) {
    const payload = { username: organizer.username, sub: organizer.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(organizer: any) {
    // Save organizer in DB first ...
    const payload = { username: organizer.username, sub: organizer.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
