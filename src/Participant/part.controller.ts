import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PartService } from './part.service';
import { userdata } from './part.dto';
import { MulterError, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Body() userdata: userdata,
  ): void {
    console.log(file.filename);
    console.log(userdata);
  }
}
