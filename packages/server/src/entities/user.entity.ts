import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import UserProfile from './userProfile.entity';

export enum EUserType {
  CUSTOMER = 'customer',
  DELIVERY = 'delivery',
  MARKETER = 'marketer',
}

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: EUserType.CUSTOMER })
  userType: EUserType;

  @OneToOne((type) => UserProfile, (userProfile) => userProfile.user)
  profile: UserProfile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
