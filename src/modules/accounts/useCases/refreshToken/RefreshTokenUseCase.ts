import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DayjsProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh token  does not exist');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.userTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token,
      user_id: sub,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
