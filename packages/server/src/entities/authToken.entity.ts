import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('auth_tokens')
export default class AuthToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('uuid')
  fk_user_id: string;

  @Column('timestamptz')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.uuid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;
}
