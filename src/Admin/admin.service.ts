import { Injectable } from '@nestjs/common';
import { userdata, CreateAdminrDto } from './admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly organizerRepo: Repository<Admin>,
  ) {}

  async create(org: CreateAdminrDto) {
    const user = this.organizerRepo.create(org);
    return await this.organizerRepo.save(user);
  }

  async findAll(): Promise<Admin[]> {
    return await this.organizerRepo.find();
  }

  async findByFullNameSubstring(substring: string): Promise<Admin | null> {
    return await this.organizerRepo.findOne({
      where: { fullName: Like(`%${substring}%`) },
    });
  }

  async findByUserName(username: string): Promise<Admin | null> {
    return await this.organizerRepo.findOneBy({ userName: username });
  }

  async removeByUserName(username: string): Promise<void> {
    await this.organizerRepo.delete({ userName: username });
  }

  loadUser(): string {
    return 'Hello All Users!';
  }

  searchUserByID(uid: number): string {
    return 'User id: ' + uid;
  }

  addUsers(userdata: userdata): object {
    return userdata;
  }

  loadOrganizer(): string {
    return 'Hello All Organizers!';
  }

  loadEvent(): string {
    return 'These are the events';
  }
}
