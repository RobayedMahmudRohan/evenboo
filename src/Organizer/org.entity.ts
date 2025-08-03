import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity('organizer')
export class OrgEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uniqueId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  eventDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  eventCountry: string;
}