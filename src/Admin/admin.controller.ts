import {Controller,Get,Param,Post,Body,UseInterceptors,UploadedFile,Res,UsePipes,ValidationPipe,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { userdata, organizerdata } from './admin.dto';
import { MulterError, diskStorage } from 'multer';

@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('alluser')
  loadUser(): string {
    return this.adminService.loadUser();
  }

  @Get('allorganizer')
  loadOrganizer(): string {
    return this.adminService.loadOrganizer();
  }

  @Get('events')
  loadEvent(): string {
    return this.adminService.loadEvent();
  }

  @Get(':uid')
  searchUserByID(@Param('uid') uid: number): string {
    return this.adminService.searchUserByID(uid);
  }
  @Post('adduser')
  @UsePipes(new ValidationPipe())
  addUser(@Body() userdata: userdata): object {
    return this.adminService.addUsers(userdata);
  }

  @Post('addorg')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('opp', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
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
    @Body() organizerdata: organizerdata,
  ): void {
    console.log(file.filename);
    console.log(organizerdata);

  }
}
