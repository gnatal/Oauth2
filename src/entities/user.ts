import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Session } from './session'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password: string

  @Column()
  email: string

  @OneToOne(() => Session)
  @JoinColumn()
  session: Session
}
