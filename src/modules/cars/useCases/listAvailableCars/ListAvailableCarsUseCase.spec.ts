// import { AppError } from '../../../../shared/errors/AppError';
import { CarsRespositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRespositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRespositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('should be able to list all cars', async () => {
    const car = await createCarUseCase.execute({
      name: `car1`,
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: `ABC-1211`,
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await createCarUseCase.execute({
      name: `car2`,
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: `ABC-1212`,
      fine_amount: 60,
      brand: 'brand_test',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({ brand: 'brand_test' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await createCarUseCase.execute({
      name: `car3`,
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: `ABC-1213`,
      fine_amount: 60,
      brand: 'brand_test',
      category_id: 'category',
    });

    const cars = await listCarsUseCase.execute({ name: 'car2' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await createCarUseCase.execute({
      name: `car1`,
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: `ABC-1211`,
      fine_amount: 60,
      brand: 'brand_test',
      category_id: 'asdas-asdasd-asdasd-1519651a-asdgf',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'asdas-asdasd-asdasd-1519651a-asdgf',
    });

    expect(cars).toEqual([car]);
  });
});
