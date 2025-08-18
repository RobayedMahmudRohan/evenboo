import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { OrgData, LoginData, UpdatePasswordData, FunctionData } from './org.dto';
import { OrgEntity } from './org.entity';
import { FunctionEntity } from './function.entity';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrgEntity)
    private orgRepository: Repository<OrgEntity>,
    @InjectRepository(FunctionEntity)
    private functionRepository: Repository<FunctionEntity>,
    private jwtService: JwtService,
  ) {}


  // Create Function by Organizer
  async createFunction(userId: number, dto: FunctionData) {
    const organizer = await this.orgRepository.findOne({ where: { id: userId } });
    if (!organizer) throw new NotFoundException('Organizer not found');

    const newFunction = this.functionRepository.create({
      ...dto,
      date: new Date(dto.date),
      organizer,
    });

    return await this.functionRepository.save(newFunction);
  }

  // Get all functions with organizer info
  async getAllFunctions() {
    return this.functionRepository.find({
      relations: ['organizer'],
      order: { createdAt: 'DESC' },
    });
  }

  // Get functions created by specific organizer
  async getMyFunctions(userId: number) {
    return this.functionRepository.find({
      where: { organizer: { id: userId } },
      relations: ['organizer'],
      order: { createdAt: 'DESC' },
    });
  }

  // Get function by id
  async getFunctionById(id: number) {
    const func = await this.functionRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });
    if (!func) throw new NotFoundException('Function not found');
    return func;
  }

  // Register
  async createOrg(orgData: OrgData) {
    const existing = await this.orgRepository.findOne({
      where: { email: orgData.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const hashed = await bcrypt.hash(orgData.password, 12);
    const newOrg = this.orgRepository.create({
      ...orgData,
      password: hashed,
    });

    const saved = await this.orgRepository.save(newOrg);

    const payload = { sub: saved.id, email: saved.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Successfully registered',
      access_token: token,
      user: {
        id: saved.id,
        fullname: saved.fullname,
        email: saved.email,
        phoneNumber: saved.phoneNumber,
        image: saved.image,
      },
    };
  }

  // Login
  async loginUser(loginData: LoginData) {
    const user = await this.orgRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginData.email })
      .getOne();

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(loginData.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: `Login successful. Welcome ${user.fullname}`,
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    };
  }

  async getAllOrg() {
    return this.orgRepository.find({
      select: [
        'id',
        'uniqueId',
        'fullname',
        'email',
        'phoneNumber',
        'image',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async getOrgByID(id: number) 
  {
    const org = await this.orgRepository.findOne({ where: { id } });
    if (!org) throw new NotFoundException(`User not found`);
    return org;
  }

  async getCurrentUserProfile(userId: number) 
  {
    const org = await this.orgRepository.findOne({ where: { id: userId } });
    if (!org) throw new NotFoundException(`User not found`);
    return org;
  }

  async updatePassword(userId: number, dto: UpdatePasswordData) 
  {
    const user = await this.orgRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });
    if (!user) throw new NotFoundException(`User not found`);

    const valid = await bcrypt.compare(dto.oldPassword, user.password);
    if (!valid) throw new UnauthorizedException('Old password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, 12);
    await this.orgRepository.update(userId, { password: hashed });

    return { message: 'Password updated successfully' };
  }

  async updateProfileImage(userId: number, imageUrl: string) 
  {
    const user = await this.orgRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);

    if (user.image && fs.existsSync(path.join(process.cwd(), user.image))) {
      try {
        fs.unlinkSync(path.join(process.cwd(), user.image));
      } catch {}
    }

    await this.orgRepository.update(userId, { image: imageUrl });

    return { message: 'Profile image updated', image: imageUrl };
  }

  async deleteAccount(userId: number) 
  {
    const user = await this.orgRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);

    if (user.image && fs.existsSync(path.join(process.cwd(), user.image))) {
      try {
        fs.unlinkSync(path.join(process.cwd(), user.image));
      } catch {}
    }

    await this.orgRepository.delete(userId);
    return { message: 'Account deleted successfully' };
  }

  async validateUser(id: number) 
  {
    return this.orgRepository.findOne({
      where: { id },
      select: ['id', 'fullname', 'email', 'phoneNumber', 'image'],
    });
  }
}
