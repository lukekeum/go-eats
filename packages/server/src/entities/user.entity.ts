import app from '@src/app';
import { access } from 'fs';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import AuthToken from './authToken.entity';
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

  async generateAuthToken() {
    const authToken = new AuthToken();
    authToken.fk_user_id = this.uuid;
    await authToken.save();

    const refreshToken = app.server.jwt.sign(
      { user_id: this.uuid, token_id: authToken.uuid },
      { subject: 'refresh-token', expiresIn: '30d' }
    );

    const accessToken = app.server.jwt.sign(
      {
        user_id: this.uuid,
      },
      {
        subject: 'access-token',
        expiresIn: '1h',
      }
    );

    return { refreshToken, accessToken };
  }
}
