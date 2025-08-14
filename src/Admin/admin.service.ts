import { Injectable } from '@nestjs/common';
import{userdata,CreateOrganizerDto}from './admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import{Organizer}from './admin.entity';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(Organizer)private readonly organizerRepo: Repository<Organizer>) {}

  async create(org: CreateOrganizerDto) {
      const user = this.organizerRepo.create(org);
      return await this.organizerRepo.save(user);
    }

  async findAll(): Promise<Organizer[]> {
    return await this.organizerRepo.find();
  }

  async findByFullNameSubstring(substring: string): Promise<Organizer[]> {
  return await this.organizerRepo.find({where: {fullName: Like(`%${substring}%`),},});
}

  async findByUserName(username: string): Promise<Organizer | null> {
  return await this.organizerRepo.findOneBy({ userName: username });
}

async removeByUserName(username: string): Promise<void> {
  await this.organizerRepo.delete({ userName: username });
}




  loadUser(): string {
    return 'Hello All Users!';
  }
  
  searchUserByID(uid: number): string{
    return 'User id: ' + uid;
  }

  addUsers(userdata: userdata): object{
    return userdata;
  }
  
  loadOrganizer(): string {
    return 'Hello All Organizers!';
  }

  loadEvent(): string {
    return 'These are the events';
  }

}