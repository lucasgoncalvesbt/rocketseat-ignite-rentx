import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DayjsProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Autheticate User', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'oi@rocketseat.com.br',
      name: 'Rocketseat',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate with an non existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'testeErrado@email.com',
        password: 'user.password',
      }),
    ).rejects.toEqual(new AppError('Email or password invalid'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'oi@rocketseat.com.br',
      name: 'Rocketseat',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'user.password',
      }),
    ).rejects.toEqual(new AppError('Email or password invalid'));
  });
});
