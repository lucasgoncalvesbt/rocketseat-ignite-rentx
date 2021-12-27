import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DayjsProvider/IDateProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ password, token }: IRequest) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new Error('Token invalid');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new Error('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
