import { Injectable } from '@nestjs/common';
import{userdata}from './admin.dto';

@Injectable()
export class AdminService {
  
    loadUser(): string {
    return 'Hello All Users!';
  }
  
  searchUserByID(uid:number): string{
    return 'User id: ' + uid;
  }

  addUser(userdata:userdata):object{
    return userdata;
  }
  
  loadOrganizer(): string {
    return 'Hello All Organizers!';
  }

  loadEvent(): string {
    return 'These are the events';
  }

}