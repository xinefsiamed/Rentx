import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject('carsRepository')
    private carsRepository: ICarsRepository
  ) { } //eslint-disable-line

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exist');
    }
  }
}

export { CreateCarSpecificationUseCase };
