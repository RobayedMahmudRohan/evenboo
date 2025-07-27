import { Controller, Get, Param } from '@nestjs/common';
import { OrgService } from './org.service';

@Controller('Organizer')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  getOrg(): string {
    return this.orgService.getOrg();
  }

  @Get(':id')
  getOrgByID(@Param('id') id: number): string {
    return this.orgService.getOrgID(id);
  }
}
