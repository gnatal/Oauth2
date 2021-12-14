import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClientScope {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  scopeName: string;
  
}
