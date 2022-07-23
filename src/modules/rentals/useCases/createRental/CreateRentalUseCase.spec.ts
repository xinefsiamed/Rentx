import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRespositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '../../../cars/useCases/createCar/CreateCarUseCase';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let createCarUseCase: CreateCarUseCase;
let rentalsRepositoryinMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRespositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryinMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRespositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryinMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '65165',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user!')
    );
  });

  it('should not be able to create a new rental if there is another open rental to the same car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123455',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is not available'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
