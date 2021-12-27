import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
    const rental = await devolutionRentalUseCase.execute({ id, user_id });

    return res.json(rental);
  }
}

export { DevolutionRentalController };
