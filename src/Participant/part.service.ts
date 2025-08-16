import { userdata } from './part.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull  } from 'typeorm';
import { User, User2 } from './part.entity';
import { CreateUser2Dto, UpdatePhoneDto, UpdateProfileDto } from './part.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Event } from '../Admin/admin.entity';

@Injectable()
export class PartService {
  loadevent(): string {
    return 'Event Loaded!';
  }
  addUser(userdata: userdata): object {
    return userdata;
  }
}
@Injectable()
export class User2Service {
  constructor(@InjectRepository(User2) private userRepo: Repository<User2>) {}

  create(dto: CreateUser2Dto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async updatePhone(id: number, dto: UpdatePhoneDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user.phone = dto.phone;
    return this.userRepo.save(user);
  }

  getUsersWithNullName() {
    return this.userRepo.find({ where: { name: IsNull() } });
  }

  async remove(id: number) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}

//For Project
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private mailerService: MailerService,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

async loadevent(userId: number): Promise<{ message: string; events: Event[] }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const events = await this.eventRepo.find();

    return {
      message: `Event Loaded! ${user.fullName}!`,
      events,
    };
  }

async getProfile(userId: number) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    select: ['fullName', 'email', 'phone'],
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return {
    message: `Welcome Back ${user.fullName} !`,
    Profile_Info: user,
  };
}

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto);
    await this.userRepo.save(user);
    return {
      message: 'Profile updated successfully',
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepo.save(user);
     try {
  await this.mailerService.sendMail({
    to: user.email,
    subject: 'Password Changed Successfully',
    text: `Hi ${user.fullName}, you password have been changed succesfully!`,
  });
  console.log('Email sent successfully');
} catch (err) {
  console.error('SendGrid error:', err);
}
    return { message: 'Password changed successfully' };
  }

  async deleteUser(userId: number) {
    const result = await this.userRepo.delete(userId);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'Account deleted successfully' };
  }
}

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // Register for an event
  async registerEvent(userId: number, eventId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['registeredEvents'],
    });
    if (!user) throw new NotFoundException('User not found');

    const event = await this.eventRepository.findOneBy({ id: eventId });
    if (!event) throw new NotFoundException('Event not found');

    // Prevent duplicate registration
    const alreadyRegistered = user.registeredEvents.some(e => e.id === event.id);
    if (alreadyRegistered) {
      return {
        message: 'You are already registered for this event',
        event: {
          id: event.id,
          name: event.name,
          location: event.location,
          seat: event.seat,
          price: event.price,
          date: event.date,
          time: event.time,
        },
      };
    }

    // Register the user
    user.registeredEvents.push(event);
    await this.userRepository.save(user);

    return {
      message: 'Event successfully registered',
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      event: {
        id: event.id,
        name: event.name,
        location: event.location,
        seat: event.seat,
        price: event.price,
        date: event.date,
        time: event.time,
      },
    };
  }

  // Get all registered events for a user
  async getRegisteredEvents(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['registeredEvents'],
    });
    if (!user) throw new NotFoundException('User not found');

    // Return event details only
    return user.registeredEvents.map(event => ({
      id: event.id,
      name: event.name,
      location: event.location,
      seat: event.seat,
      price: event.price,
      date: event.date,
      time: event.time,
    }));
  }

  // Unregister from an event
  async unregisterEvent(userId: number, eventId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['registeredEvents'],
    });
    if (!user) throw new NotFoundException('User not found');

    const event = user.registeredEvents.find(e => e.id === eventId);
    if (!event) {
      return { message: 'You are not registered for this event' };
    }

    user.registeredEvents = user.registeredEvents.filter(e => e.id !== eventId);
    await this.userRepository.save(user);

    return {
      message: 'Event successfully unregistered',
      event: {
        id: event.id,
        name: event.name,
        location: event.location,
        seat: event.seat,
        price: event.price,
        date: event.date,
        time: event.time,
      },
    };
  }
}

