import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) { } //eslint-disable-line

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist!');
    }

    const token = uuidv4();

    const expires_date = this.dateProvider.addMinutes(15);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para reset é ${token}`
    );
  }
}

export { SendForgotPasswordMailUseCase };
