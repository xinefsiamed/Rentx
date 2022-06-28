import { getRepository, Repository } from 'typeorm';

import { ICarsImageRepository } from '../../../repositories/ICarsImageRepository';
import { CarImage } from '../entities/CarImage';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const car_image = this.repository.create({ car_id, image_name });

    await this.repository.save(car_image);

    return car_image;
  }
}
export { CarsImageRepository };
