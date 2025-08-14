import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user2')
export class User2 {
  @PrimaryColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 1000000);
  }
}

//For my project

//User Registration Entity- ID, Fullname, Email, Phone, Password, NID Path 
@Entity('User')
export class User
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  phone: string;

  @Column()
  password: string;

  @Column()
  nidPath: string;
}