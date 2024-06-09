import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './model/user.dto';
import { UserEntity } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateHash } from './lib/generate-hash';

@Injectable()
export class UserService {
  private static instance: UserService | null = null;

  @InjectRepository(UserEntity)
  private usersRepository: Repository<UserEntity>;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = this;
  }

  async add(data: CreateUserDto) {
    const passwordHash = await generateHash(data.password);

    const userDto = new UserEntity({
      email: data.email,
      login: data.login,
      password: passwordHash,
    });

    const user = await this.usersRepository
      .createQueryBuilder('insert_user')
      .insert()
      .into(UserEntity)
      .values(userDto)
      .returning('*')
      .execute();

    return this.usersRepository.create(user.generatedMaps[0]);
  }

  async updatePassword(id: string, password: UserEntity['password']) {
    const passwordHash = await generateHash(password);

    await this.usersRepository.update({ id }, { password: passwordHash });

    return passwordHash;
  }
}
