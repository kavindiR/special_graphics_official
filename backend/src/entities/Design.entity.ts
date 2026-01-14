import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User.entity';

@Entity('designs')
export class Design {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'uuid' })
  designerId!: string;

  @ManyToOne(() => User, (user) => user.designs)
  @JoinColumn({ name: 'designerId' })
  designer!: User;

  @Column({ type: 'varchar', length: 255 })
  designerName!: string;

  @Column({ type: 'text', length: 1000 })
  description!: string;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'text', array: true, default: [] })
  tags!: string[];

  @Column({ type: 'varchar', length: 255 })
  tools!: string;

  @Column({ type: 'int', default: 0 })
  likes!: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'design_likes',
    joinColumn: { name: 'designId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  likedBy!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

