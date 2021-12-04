import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { ClientScope } from './clientScopes'
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  secret: string

  @Column()
  client_id: string

  @Column()
  client_name: string;

  @Column()
  redirect_url: string;
  
  @Column()
  token_url: string;

  @Column()
  api_base_url: string;

  @OneToOne(() => ClientScope)
  @JoinColumn()
  scopes:ClientScope
  
}
