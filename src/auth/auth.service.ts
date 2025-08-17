import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Participant/part.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';

//PROJECT_EVENBOO-AUTH_SERVICE
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(dto: RegisterDto, nidFilename: string) {
    const exists = await this.repo.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
    });
    if (exists) throw new ConflictException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      password: hashed,
      nidPath: nidFilename,
    });

    await this.repo.save(user);
    return { message: 'Registration successful' };
  }

  async login(dto: LoginDto) {
    const user = await this.repo.findOne({
      where: [{ email: dto.phoneOrEmail }, { phone: dto.phoneOrEmail }],
    });
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    const token = this.jwt.sign(
      { sub: user.id, email: user.email },
      { secret: 'yourSuperSecretKeyThatIsVeryLong@123456789!' },
    );
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Login Successful',
        text: `Hi ${user.fullName}, you have successfully logged in!`,
      });
      console.log('Email sent successfully');
    } catch (err) {
      console.error('Mailer error:', err);
    }

    return { access_token: token };
  }
}
