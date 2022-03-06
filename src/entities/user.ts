import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Session } from './session'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ select: false })
  password: string

  @Column()
  email: string

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];

}
