import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('user_profiles')
export default class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  username: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at: Date;
}
