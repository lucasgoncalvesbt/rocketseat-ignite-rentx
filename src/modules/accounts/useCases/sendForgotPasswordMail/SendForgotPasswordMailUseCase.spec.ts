import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DayjsProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '123456789',
      email: 'user@example.com',
      name: 'user',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('user@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be  able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('inavlido'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('should be able to create an user token', async () => {
    const generateTokenmail = jest.spyOn(
      userTokensRepositoryInMemory,
      'create',
    );

    await usersRepositoryInMemory.create({
      driver_license: '1234567891',
      email: 'user2@example.com',
      name: 'user2',
      password: '12345',
    });

    await sendForgotPasswordMailUseCase.execute('user2@example.com');

    expect(generateTokenmail).toHaveBeenCalled();
  });
});
