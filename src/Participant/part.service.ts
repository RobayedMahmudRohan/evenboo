import { userdata } from './part.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull  } from 'typeorm';
import { User, User2 } from './part.entity';
import { CreateUser2Dto, UpdatePhoneDto, UpdateProfileDto } from './part.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PartService {
  loadevent(): string {
    return 'Event Loaded!';
  }
  addUser(userdata: userdata): object {
    return userdata;
  }
}
@Injectable()
export class User2Service {
  constructor(@InjectRepository(User2) private userRepo: Repository<User2>) {}

  create(dto: CreateUser2Dto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async updatePhone(id: number, dto: UpdatePhoneDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user.phone = dto.phone;
    return this.userRepo.save(user);
  }

  getUsersWithNullName() {
    return this.userRepo.find({ where: { name: IsNull() } });
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}

//For Project
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

async loadevent(userId: number): Promise<string> {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');
  return `Event Loaded! ${user.fullName} !`;
}


async getProfile(userId: number) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    select: ['fullName', 'email', 'phone'],
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return {
    message: `Welcome Back ${user.fullName} !`,
    Profile_Info: user,
  };
}

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto);
    await this.userRepo.save(user);
    return {
      message: 'Profile updated successfully',
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepo.save(user);
    return { message: 'Password changed successfully' };
  }

  async deleteUser(userId: number) {
    const result = await this.userRepo.delete(userId);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'Account deleted successfully' };
  }
}