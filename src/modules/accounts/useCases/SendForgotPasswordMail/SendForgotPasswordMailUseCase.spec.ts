import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot mail', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      name: 'Christian Edwards',
      password: '57073362',
      email: 'vibube@jujikogad.kp',
      driver_license: '751661',
    });

    await sendForgotPasswordMailUseCase.execute('vibube@jujikogad.kp');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('evise@bawa.li')
    ).rejects.toEqual(new AppError('User does not exist!'));
  });

  it('Should be able to create an new users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, 'create');

    await usersRepository.create({
      name: 'Mamie Stanley',
      password: '746585924',
      email: 'bulujile@dulupik.ug',
      driver_license: '918988',
    });

    await sendForgotPasswordMailUseCase.execute('bulujile@dulupik.ug');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
