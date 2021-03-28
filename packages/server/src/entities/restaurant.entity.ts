import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import User from './user.entity';

@Entity('restaurants')
export default class Restaurants extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('uuid')
  fk_user_id: string;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Index()
  @Column({ type: 'varchar', length: 30, nullable: false })
  display_name: string;

  @Index()
  @Column({ type: 'varchar', array: true })
  deliver_addresses: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
