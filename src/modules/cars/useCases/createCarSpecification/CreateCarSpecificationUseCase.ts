import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject('carsRepository')
    private carsRepository: ICarsRepository,

    private specificationsRepository: ISpecificationsRepository
  ) { } //eslint-disable-line

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exist');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    console.log(carExists);
  }
}

export { CreateCarSpecificationUseCase };