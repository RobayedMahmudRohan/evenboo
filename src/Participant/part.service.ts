import { Injectable } from '@nestjs/common';
import { userdata } from './part.dto';
@Injectable()
export class PartService {
  loadevent(): string {
    return 'Event Loaded!';
  }
  addUser(userdata: userdata): object {
    return userdata;
  }
}
