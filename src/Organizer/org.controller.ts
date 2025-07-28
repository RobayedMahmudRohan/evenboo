import { Controller, Get, Post, Put, Param, Body, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';
import { OrgService } from './org.service';
import { OrgData } from './org.dto';


@Controller('Organizer')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}

    @Get()
    getAllOrg(): string {
        return this.orgService.getAllOrg();
    }

    @Get(':id')
      getOrgByID(@Param('id') id:number): string {
        return this.orgService.getOrgByID(id);
      }

    @Post()
      createOrg(@Body() orgData: OrgData): string {
        return this.orgService.createOrg(orgData);
      }

    @Put(':id')
      updateOrg(@Param('id') id: number, @Body() orgData: OrgData): string {
        return this.orgService.updateOrg(id, orgData);
      }

    @Post('addorg')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilePicture',
    { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 3000000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }))
    addOrg(@UploadedFile() file: Express.Multer.File, @Body() orgData: OrgData): string {
    console.log(file);
    console.log(orgData);
    const filename = file ? file.filename : 'no-file-uploaded';
    return this.orgService.addOrg(orgData, filename);
    }
}