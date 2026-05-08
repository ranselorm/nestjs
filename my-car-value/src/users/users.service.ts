import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //create user
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  // get a user with id
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  // get all user with a specific email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  //update user
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  //delete user
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return this.repo.remove(user);
  }
}
