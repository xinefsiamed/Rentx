import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentalsByUser = await listRentalsByUserUseCase.execute(id);

    return res.json(rentalsByUser);
  }
}

export { ListRentalsByUserController };
