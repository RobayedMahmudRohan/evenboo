import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

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
