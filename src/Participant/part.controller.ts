import { Controller, Get, Param } from '@nestjs/common';
import { PartService } from './part.service';

@Controller('Participant')
export class PartController {
  constructor(private readonly partService: PartService) {}
  @Get('allevent')
  loadevent(): string {
    return this.partService.loadevent();
  }
}
