import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import {User} from './user'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @Column("double")
  tokenExpirationDate: number;


  @Column()
  refreshToken: string

  @Column("double")
  refreshTokenExpirationDate: number;

}
