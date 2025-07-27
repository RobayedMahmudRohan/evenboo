import { Injectable } from '@nestjs/common';
@Injectable()
export class PartService {
  loadevent(): string {
    return 'Event Loaded!';
  }
}
