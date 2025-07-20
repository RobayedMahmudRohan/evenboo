import {Controller,Get,Param, Post,Body}from "@nestjs/common";
import{AdminService}from './admin.service';
import{userdata}from './admin.dto';

@Controller('Admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    @Get('alluser')
    loadUser(): string{
        return this.adminService.loadUser();
    }

    @Get('allorganizer')
    loadOrganizer(): string{
        return this.adminService.loadOrganizer();
    }

    @Get('events')
    loadEvent(): string{
        return this.adminService.loadEvent();
    }

    @Get(':uid')
    searchUserByID(@Param('uid')uid:number):string{
        return this.adminService.searchUserByID(uid);
    }
    @Post('adduser')
    addUser(@Body()userdata: userdata): object{
        return this.adminService.addUser(userdata);
    }

}