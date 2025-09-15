import {Controller,Get,Param,Post,Body,Put,UseInterceptors,UploadedFile,Res,UsePipes,ValidationPipe, Delete, Patch,ParseIntPipe,UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { userdata, organizerdata,CreateAdminrDto } from './admin.dto';
import { MulterError, diskStorage } from 'multer';
import { Admin,Organizer } from './admin.entity';
import { JwtAuthGuard } from './jwt-admin.guard';

@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('createadmin')
  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAdminrDto) {
    return this.adminService.create(dto);
  }

  @Post(':id/organizer')
  @UsePipes(new ValidationPipe())
  async addOrganizer(
    @Param('id', ParseIntPipe) adminId: number,
    @Body() organizerData: Partial<Organizer>,
  ): Promise<Organizer> {
    return this.adminService.createOrganizer(adminId, organizerData);
  }

  @Get('username/:username')
  async findByUserName(@Param('username') username: string): Promise<Admin | null> {
    return this.adminService.findByUserName(username);
  }

  // @Delete('deleteadmin/:username')
  // async removeByUserName(@Param('username') username: string): Promise<void> {
  //   await this.adminService.removeByUserName(username);
  // }

  @Get('search/:substring')
  async searchByFullName(@Param('substring') substring: string) {
    return this.adminService.findByFullNameSubstring(substring);
  }

  @Patch(':id/is-active')
  async updateIsActive(
    @Param('id') id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return this.adminService.updateIsActive(id, isActive);
  }

  @Post('login')
  async login(@Body() body: { userName: string; password: string }) {
    return this.adminService.login(body.userName, body.password);
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') newPassword: string,
  ): Promise<Admin> {
    return this.adminService.updatePassword(id, newPassword);
  }

  @Get(':id/organizers')
  async getOrganizers(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminWithOrganizers(id);
  }
  @Get('allorganizers')
async getAllOrganizers() {
  return this.adminService.findAllOrganizer();
}

@Post('addorg')
async addorganizer(@Body() data: Partial<Organizer>): Promise<Organizer> {
  if (data.admin?.id === undefined) {
    return this.adminService.addorganizer(0, data); // or throw error if admin is required
  }
  return this.adminService.addorganizer(data.admin.id, data);
}

  // PUT update organizer
  @Put('updateorganizer/:id')
  async updateOrganizer(
    @Param('id') id: number,
    @Body() data: Partial<Organizer>,
  ): Promise<Organizer> {
    return this.adminService.updateOrganizer(Number(id), data);
  }

  // DELETE organizer
  @Delete('deleteorganizer/:id')
  async deleteOrganizer(@Param('id') id: number): Promise<{ message: string }> {
    await this.adminService.deleteOrganizer(Number(id));
    return { message: `Organizer with id ${id} deleted successfully` };
  }

  //admin 

  @Get('alladmins')
async findAll(): Promise<Admin[]> {
  return this.adminService.findAllAdmins();
}

@Put('updateadmin/:id')
async updateAdmin(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: Partial<Admin>,
): Promise<Admin> {
  return this.adminService.updateAdmin(id, data);
}

@Delete('deleteadmin/:id')
async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
  await this.adminService.deleteAdmin(id);
  return { message: `Admin with id ${id} deleted successfully` };
}

}
