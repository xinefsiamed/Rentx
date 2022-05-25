import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../../DTOs/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) { } //eslint-disable-line

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
