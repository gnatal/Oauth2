import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import {User} from './user'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable:true
  })
  auth_code: string;

  @Column({
    nullable:true
  })
  auth_code_used: boolean;

  @Column({
    nullable:true
  })
  pkce_hash: string;

  @Column({
    nullable:true
  })
  token: string

  @Column("double",{
    nullable:true
  })
  tokenExpirationDate: number;


  @Column({
    nullable:true
  })
  refreshToken: string

  @Column("double",{
    nullable:true
  })
  refreshTokenExpirationDate: number;

}
