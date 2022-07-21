import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { } //eslint-disable-line

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimalRentalHour = 24;
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavaliable) {
      throw new AppError('Car is not available');
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for this user!');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimalRentalHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
