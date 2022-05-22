import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationsUseCase) { } //eslint-disable-line

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();

    return res.json(specifications);
  }
}

export { ListSpecificationController };
