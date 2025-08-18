import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FunctionEntity } from './function.entity';

@Entity('UserAsOrganizer')
export class OrgEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true, name: 'unique_id' })
  uniqueId: string;

  @Column({ type: 'varchar', length: 100, name: 'fullname' })
  fullname: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 20, name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, select: false, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'image' })
  image: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => FunctionEntity, (func: FunctionEntity) => func.organizer, { cascade: true })
  functions: FunctionEntity[];

  @BeforeInsert()
  generateUniqueId() {
    this.uniqueId = uuidv4();
  }
}
