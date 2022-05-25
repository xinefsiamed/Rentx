import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
