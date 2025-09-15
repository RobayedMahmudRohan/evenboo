import { Injectable,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { userdata, CreateAdminrDto } from './admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Admin,Organizer } from './admin.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(Organizer)
    private readonly organizerRepo: Repository<Organizer>,
  ) {}

  async createOrganizer(
    adminId: number,
    organizerData: Partial<Organizer>,
  ): Promise<Organizer> {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${adminId} not found`);
    }

    const organizer = this.organizerRepo.create({
      ...organizerData,
      admin,
    });

    return this.organizerRepo.save(organizer);
  }

  async create(org: CreateAdminrDto) {
    const user = this.adminRepo.create(org);
    return await this.adminRepo.save(user);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepo.find();
  }

  async findByFullNameSubstring(substring: string): Promise<Admin | null> {
    return await this.adminRepo.findOne({
      where: { fullName: Like(`%${substring}%`) },
    });
  }

  async findByUserName(username: string): Promise<Admin | null> {
    return await this.adminRepo.findOneBy({ userName: username });
  }

  async removeByUserName(username: string): Promise<void> {
    await this.adminRepo.delete({ userName: username });
  }

  async login(userName: string, password: string) {
    const admin = await this.findByUserName(userName);
    if (!admin) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Admin account is not active');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: admin.userName, id: admin.id };
    const token = jwt.sign(payload, 'yourSuperSecretKeyThatIsVeryLong@123456789!', {
      expiresIn: '15m',
    });

    return {
      message: 'Login successful',token,
      admin: {
        id: admin.id,
        userName: admin.userName,
        fullName: admin.fullName,
      },
    };
  }

  async updateIsActive(id: number, isActive: boolean): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    admin.isActive = isActive;
    return this.adminRepo.save(admin);
  }

  async updatePassword(id: number, newPassword: string): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    admin.password = newPassword;
    return this.adminRepo.save(admin);
  }

  async getAdminWithOrganizers(adminId: number) {
    return this.adminRepo.findOne({
      where: { id: adminId },
      relations: ['organizers'],
    });
  }
  //get all organizers
  async findAllOrganizer(): Promise<Organizer[]> {
  return await this.organizerRepo.find();
  }
    // Create organizer
 async addorganizer(adminId: number | null, organizerData: Partial<Organizer>): Promise<Organizer> {
  let admin: Admin | undefined;

  if (adminId !== null) {
    const foundAdmin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!foundAdmin) throw new NotFoundException(`Admin with id ${adminId} not found`);
    admin = foundAdmin; // assign only if found
  }

  if (organizerData.opassword) {
    const salt = await bcrypt.genSalt(10);
    organizerData.opassword = await bcrypt.hash(organizerData.opassword, salt);
  }

  const organizer = this.organizerRepo.create({ ...organizerData, admin });
  return this.organizerRepo.save(organizer);
}




  // Update organizer
  async updateOrganizer(
  id: number,
  organizerData: Partial<Organizer>,
): Promise<Organizer> {
  const organizer = await this.organizerRepo.findOne({ where: { id }, relations: ['admin'] });
  if (!organizer) {
    throw new NotFoundException(`Organizer with id ${id} not found`);
  }

  // Update fields if they exist in organizerData
  if (organizerData.oname !== undefined) organizer.oname = organizerData.oname;
  if (organizerData.oemail !== undefined) organizer.oemail = organizerData.oemail;
  if (organizerData.ogender !== undefined) organizer.ogender = organizerData.ogender;
  if (organizerData.opnumber !== undefined) organizer.opnumber = organizerData.opnumber;
  if (organizerData.opassword !== undefined) {
    const salt = await bcrypt.genSalt(10);
    organizer.opassword = await bcrypt.hash(organizerData.opassword, salt);
  }
  if (organizerData.admin?.id !== undefined) {
    const admin = await this.adminRepo.findOne({ where: { id: organizerData.admin.id } });
    if (!admin) throw new NotFoundException(`Admin with id ${organizerData.admin.id} not found`);
    organizer.admin = admin;
  }

  // Save updated entity
  return this.organizerRepo.save(organizer);
}


  // Delete organizer
  async deleteOrganizer(id: number): Promise<void> {
    const result = await this.organizerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Organizer with id ${id} not found`);
    }
  }


  //admin

  // Get all admins
async findAllAdmins(): Promise<Admin[]> {
  return this.adminRepo.find();
}

// Update admin (username, fullName, isActive, etc.)
async updateAdmin(id: number, data: Partial<Admin>): Promise<Admin> {
    // never allow changing the primary key accidentally
    if ((data as any).id) delete (data as any).id;

    // find existing admin
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    // merge incoming data into the entity and save
    const merged = this.adminRepo.merge(admin, data);
    const saved = await this.adminRepo.save(merged);

    return saved;
  }

// Delete admin by ID
async deleteAdmin(id: number): Promise<void> {
  await this.adminRepo.delete(id);
}

}
