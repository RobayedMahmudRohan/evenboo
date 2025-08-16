import { Entity, Column, PrimaryColumn, BeforeInsert,PrimaryGeneratedColumn } from 'typeorm';

@Entity('Organizers')
export class Organizer {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'UserName', type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ name: 'FullName', type: 'varchar', length: 150 })
  fullName: string;

  @Column({ name: 'IsActive', default: false })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 1000);
  }
}


@Entity('organizers')
export class OrganizerData {
  @PrimaryGeneratedColumn()
  orgId: number;

  @Column({ type: 'varchar', length: 50 })
  oname: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  oemail: string;

  @Column({ type: 'varchar', length: 10 })
  ogender: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  opnumber: string;

  @Column({ type: 'varchar', length: 255 })
  opassword: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  oprofilepicture?: string;
}

@Entity('Events')
export class Events {
  @PrimaryGeneratedColumn()
  eventid: number;

  @Column({ type: 'varchar', length: 100 })
  eventname: string;

  @Column({ type: 'date' })
  eventstartdate: Date;

  @Column({ type: 'date' })
  eventenddate: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  eventplace: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticketprice: number;

  @Column({ type: 'enum', enum: ['Activate', 'Deactivate'], default: 'Deactivate' })
  eventactive: 'Activate' | 'Deactivate';
}