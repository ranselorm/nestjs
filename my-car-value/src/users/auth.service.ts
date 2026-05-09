import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // create user
  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    //check if email is in use
    if (users.length) {
      throw new BadRequestException('Email is in use');
    }
    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash password with generated salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join salt and hashed result
    const result = salt + '.' + hash.toString('hex');

    //create the user in the db
    const user = await this.usersService.create(email, result);
    return user;
  }

  // login user
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('wrong email or password');
    }

    const [salt, storedHash] = user.password.split('.');
    console.log({ salt, storedHash });

    // hash password with destructred salt from db
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong email or password');
    }
    return user;
  }
}
