import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req
} from '@nestjs/common';
import { PartService } from './part.service';
import { userdata } from './part.dto';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { User2Service } from './part.service';
import { CreateUser2Dto, UpdatePhoneDto } from './part.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    @Body() dto: UpdatePhoneDto
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
@Controller()
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
