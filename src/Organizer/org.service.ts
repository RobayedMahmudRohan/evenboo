import { Injectable } from '@nestjs/common';

@Injectable()
export class OrgService {
    getOrg(): string {
    return 'Hello Organizer!';
  }

  getOrgID(id:number): string{
    return 'aet Organizer id ' + id;
  }
}