import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../Participant/part.entity';
@Entity('Admins')
export class Admin {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'AdminName', type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ name: 'FullName', type: 'varchar', length: 150 })
  fullName: string;

  @Column({ name: 'IsActive', default: false })
  isActive: boolean;

  @Column({ name: 'Pasword'})
  password: string;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 10000000);
  }
}

//PROJECT_EVENBOO-EVENT_TABLE_ENTITY(FROM ANIK)
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  seat: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToMany(() => User, (user) => user.registeredEvents)
  users: User[];
}
