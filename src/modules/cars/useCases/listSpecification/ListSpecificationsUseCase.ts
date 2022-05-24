import { inject, injectable } from 'tsyringe';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { } //eslint-disable-line

  execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
