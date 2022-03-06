import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { ClientScope } from './clientScopes'
import { User } from './user'
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  secret: string

  @Column()
  clientId: string

  @Column()
  name: string;
  
  @Column()
  redirectUrl: string;

  @Column()
  isSpa: boolean;

  @OneToOne(() => ClientScope)
  @JoinColumn()
  scope:ClientScope

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
  
}
