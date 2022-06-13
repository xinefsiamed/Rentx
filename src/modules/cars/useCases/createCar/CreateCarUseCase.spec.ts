import { AppError } from '../../../../shared/errors/AppError';
import { CarsRespositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRespositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new CarsRespositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with license plate already exists', async () => {
    expect(async () => {
      const car = {
        name: 'Car',
        description: 'This is a fucking car',
        daily_rate: 100,
        license_plate: 'ABC-1212',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      };

      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id,
      });

      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'This is a fucking car',
      daily_rate: 100,
      license_plate: 'ADS-1212',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'sfasfdas-asdfasdfa-asdfasdfa',
    });

    console.log(car);

    expect(car.available).toBe(true);
  });
});
