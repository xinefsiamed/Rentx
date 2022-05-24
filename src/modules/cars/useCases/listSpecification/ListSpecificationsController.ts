import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationsUseCase
    );
    const specifications = await listSpecificationUseCase.execute();

    return res.json(specifications);
  }
}

export { ListSpecificationsController };
