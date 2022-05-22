import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { } //eslint-disable-line

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
