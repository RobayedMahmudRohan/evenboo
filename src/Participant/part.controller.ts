import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  PartService,
  ProfileService,
  User2Service,
  ParticipantService,
} from './part.service';
import {
  userdata,
  CreateUser2Dto,
  UpdatePhoneDto,
  ChangePasswordDto,
  UpdateProfileDto,
} from './part.dto';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//LAB_TASK
@Controller('Participant')
export class PartController {
  constructor(private readonly partService: PartService) {}
  @Get('allevent')
  loadevent(): string {
    return this.partService.loadevent();
  }
  @Post('adduser')
  @UsePipes(new ValidationPipe())
  addUser(@Body() userdata: userdata): object {
    return this.partService.addUser(userdata);
  }

  @Post('reguser')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|PNG|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFile() file: Express.Multer.File,
    @Body() userdata: userdata,
  ): void {
    console.log(file.filename);
    console.log(userdata);
  }
}

//LAB_TASK
@Controller('user2')
export class User2Controller {
  constructor(private readonly userService: User2Service) {}

  @Post()
  create(@Body() dto: CreateUser2Dto) {
    return this.userService.create(dto);
  }

  @Patch(':id/phone')
  updatePhone(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePhoneDto,
  ) {
    return this.userService.updatePhone(id, dto);
  }

  @Get('null-name')
  getUsersWithNullFullName() {
    return this.userService.getUsersWithNullName();
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}

//PROJECT_EVENBOO_CONTROLLER
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('allevent')
  async loadevent(@Req() req) {
    return this.profileService.loadevent(req.user.userId);
  }
  @Get()
  async getProfile(@Req() req) {
    return this.profileService.getProfile(req.user.userId);
  }

  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.userId, dto);
  }

  @Put('change-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.profileService.changePassword(
      req.user.userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Delete()
  async deleteAccount(@Req() req) {
    return this.profileService.deleteUser(req.user.userId);
  }
}
@Controller()
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('events/:eventId/register')
  async registerEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return this.participantService.registerEvent(userId, eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/events')
  async getRegisteredEvents(@Req() req) {
    const userId = req.user.userId;
    return this.participantService.getRegisteredEvents(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('events/:eventId/unregister')
  async unregisterEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Req() req,
  ) {
    const userId = req.user.userId;
    return this.participantService.unregisterEvent(userId, eventId);
  }
}
