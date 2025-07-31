import { userdata } from './part.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull  } from 'typeorm';
import { User2 } from './part.entity';
import { CreateUser2Dto, UpdatePhoneDto  } from './part.dto';
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
    return this.userRepo.find({ where: { fullName: IsNull() } });
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}
