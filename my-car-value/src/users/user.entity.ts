import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @AfterInsert()
  logInsert() {
    console.log('logging user id after insertion', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('logging user id after removal', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('logging user id after update', this.id);
  }
}
