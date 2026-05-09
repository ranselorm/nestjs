import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    //check if email is in use
    if (users.length) {
      throw new BadRequestException('Email is in use');
    }
    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash password with generated salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join salt and hashed result
    const result = salt + '.' + hash;

    //create the user in the db
    const user = await this.userService.create(email, result);
    return user;
  }
}
