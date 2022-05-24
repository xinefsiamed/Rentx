import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.execute({ name, description });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
