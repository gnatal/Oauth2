import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import {User} from './user'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable:true
  })
  authCode: string;

  @Column({
    nullable:true
  })
  authCodeUsed: boolean;

  @Column({
    nullable:true
  })
  pkceHash: string;

  @Column({
    nullable:true
  })
  token: string

  @ManyToOne(() => User, user => user.sessions)
  user: User;

  @Column({
    nullable:true
  })
  refreshToken: string

}
