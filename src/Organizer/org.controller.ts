// src/Organizer/org.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OrgService } from './org.service';
import { OrgData, LoginData, UpdatePasswordData } from './org.dto';
import { JwtAuthGuard  } from '../auth-org/jwt-auth.guard';

@Controller('organizer')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + '-' + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrg(
    @Body() orgData: OrgData,
    @UploadedFile() file?: Express.Multer.File,
  ) 
  {
    if (file) orgData.image = `uploads/${file.filename}`;
    return this.orgService.createOrg(orgData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() dto: LoginData) 
  {
    return this.orgService.loginUser(dto);
  }

  @Get('profile/me')
  @UseGuards(JwtAuthGuard )
  getProfile(@Request() req: any) 
  {
    return this.orgService.getCurrentUserProfile(req.user.userId || req.user.sub);
  }

  @Get('users')
  getAll() 
  {
    return this.orgService.getAllOrg();
  }

  @Get('user/:id')
  getById(@Param('id', ParseIntPipe) id: number)
  {
    return this.orgService.getOrgByID(id);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard )
  updatePassword(@Request() req: any, @Body() dto: UpdatePasswordData) 
  {
    return this.orgService.updatePassword(req.user.userId || req.user.sub, dto);
  }

  @Patch('profile/image')
  @UseGuards(JwtAuthGuard )
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + '-' + file.originalname);
        },
      }),
    }),
  )
  updateImage(@Request() req: any, @UploadedFile() file: Express.Multer.File) 
  {
    if (!file) throw new BadRequestException('No file provided');
    return this.orgService.updateProfileImage(
      req.user.userId || req.user.sub,
      `uploads/${file.filename}`,
    );
  }

  @Delete('account')
  @UseGuards(JwtAuthGuard )
  delete(@Request() req: any) 
  {
    return this.orgService.deleteAccount(req.user.userId || req.user.sub);
  }
}
