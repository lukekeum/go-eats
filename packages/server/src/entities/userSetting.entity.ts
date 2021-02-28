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

const defaultMessage: Array<string> = ['Leave it at the door'];

export interface IAddresses {
  line1: string;
  line2: string | null;
}

@Entity('user_settings')
export default class UserSetting extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'jsonb',
    array: true,
    nullable: false,
    default: () => 'ARRAY[]::jsonb[]',
  })
  addresses: IAddresses[];

  @Column({ type: 'simple-array', default: `${defaultMessage}` })
  deliver_messages: string[];

  @OneToOne((type) => User)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
