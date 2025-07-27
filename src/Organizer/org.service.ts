import { Injectable } from '@nestjs/common';
import { OrgData } from './org.dto';

@Injectable()
export class OrgService {
    getAllOrg(): string {
    return 'All Organizers!';
  }

  getOrgByID(id:number): string{
    return 'get Organizer id ' + id;
  }

  createOrg(orgData: OrgData): string {
    return 'Organizer created with OrgId: ' + orgData.orgId + ' and email: ' + orgData.email;
  }

  updateOrg(id: number, orgData: OrgData): string {
    return 'Organizer updated with id: ' + id + ' and email: ' + orgData.email;
  }

  addOrg(orgData: OrgData, filename: string): string {
    return 'Organizer added with OrgId: ' + orgData.orgId + ', name: ' + orgData.name + ', email: ' + orgData.email + ', file: ' + filename;
  }
}