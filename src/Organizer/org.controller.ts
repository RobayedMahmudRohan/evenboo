import { Controller, Get, Post, Put, Param, Body, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";
import { OrgService } from './org.service';
import { OrgData } from './org.dto';


@Controller('Organizer')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}

    @Get()
    getAllOrg() {
        return this.orgService.getAllOrg();
    }

    @Get(':id')
    getOrgByID(@Param('id', ParseIntPipe) id: number) {
        return this.orgService.getOrgByID(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createOrg(@Body() orgData: OrgData) {
        return this.orgService.createOrg(orgData);
    }

    @Put(':id/country')
    updateCountry(@Param('id', ParseIntPipe) id: number, @Body('country') country: string) {
        return this.orgService.updateCountry(id, country);
    }

    @Get('date/:date')
    getOrgsByEventDate(@Param('date') date: string) {
        return this.orgService.getOrgsByEventDate(date);
    }

    @Get('country/unknown')
    getOrgsWithUnknownCountry() {
        return this.orgService.getOrgsWithUnknownCountry();
    }
}