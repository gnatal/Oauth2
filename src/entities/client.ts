import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
  redirect_uri: string
}
