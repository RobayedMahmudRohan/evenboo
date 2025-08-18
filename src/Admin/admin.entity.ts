import {Entity,Column,PrimaryColumn,BeforeInsert,PrimaryGeneratedColumn,ManyToMany,BeforeUpdate,OneToMany, ManyToOne} from 'typeorm';
import { User } from '../Participant/part.entity';
import * as bcrypt from 'bcrypt';
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

  @OneToMany(() => Organizer, (organizer) => organizer.admin)
  organizers: Organizer[];

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 10000000);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }


}

@Entity('Organizers')
export class Organizer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  oname: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  oemail: string;

  @Column({ type: 'varchar', length: 10 })
  ogender: string;

  @Column({ type: 'varchar', length: 15 })
  opnumber: string;

  @Column({ type: 'varchar', length: 100 })
  opassword: string;

  @ManyToOne(() => Admin, (admin) => admin.organizers, { onDelete: 'CASCADE' })
  admin: Admin;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.opassword) {
      const salt = await bcrypt.genSalt(10);
      this.opassword = await bcrypt.hash(this.opassword, salt);
    }
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
