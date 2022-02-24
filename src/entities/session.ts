import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
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

  // @Column("double",{
  //   nullable:true
  // })
  // tokenExpirationDate: number;


  @Column({
    nullable:true
  })
  refreshToken: string

  // @Column("double",{
  //   nullable:true
  // })
  // refreshTokenExpirationDate: number;

}
