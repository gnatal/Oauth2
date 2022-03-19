import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Session } from './session'
import { compareIt } from '../utils/password'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ select: false})
  password: string

  @Column()
  email: string

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];

  checkPassord(password: string): boolean {
    return compareIt(password, this.password)
  }

}
