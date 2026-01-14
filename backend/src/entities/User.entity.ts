import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Design } from './Design.entity';

export enum UserRole {
  USER = 'user',
  DESIGNER = 'designer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true, length: 500 })
  bio?: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Design, (design) => design.designer)
  designs!: Design[];

  // Remove password from JSON output
  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}

