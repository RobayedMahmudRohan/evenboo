import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgData } from './org.dto';
import { OrgEntity } from './org.entity';

@Injectable()
export class OrgService {
    constructor(
        @InjectRepository(OrgEntity)
        private orgRepository: Repository<OrgEntity>,
    ) {}

    async getAllOrg(): Promise<OrgEntity[]> {
        return this.orgRepository.find();
    }

    async getOrgByID(id: number): Promise<OrgEntity> {
        const org = await this.orgRepository.findOne({ where: { id } });
        if (!org) {
            throw new NotFoundException(`Organizer with ID ${id} not found`);
        }
        return org;
    }

    async createOrg(orgData: OrgData): Promise<OrgEntity> {
        const newOrg = this.orgRepository.create({
            eventCountry: 'Unknown'
        });
        return this.orgRepository.save(newOrg);
    }

    async updateCountry(id: number, country: string): Promise<OrgEntity> {
        const org = await this.getOrgByID(id);
        org.eventCountry = country;
        return this.orgRepository.save(org);
    }

    async getOrgsByEventDate(date: string): Promise<OrgEntity[]> {
        return this.orgRepository
            .createQueryBuilder('organizer')
            .where('DATE(organizer.eventDate) = :date', { date })
            .getMany();
    }

    async getOrgsWithUnknownCountry(): Promise<OrgEntity[]> {
        return this.orgRepository.find({ where: { eventCountry: 'Unknown' } });
    }
}