import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { ClientScope } from './clientScopes'
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  secret: string

  @Column()
  clientId: string

  @Column()
  clientSecret: string

  @Column()
  name: string;
  
  @Column()
  redirectUrl: string;

  @Column()
  isSpa: boolean;

  @OneToOne(() => ClientScope)
  @JoinColumn()
  scope:ClientScope
  
}
