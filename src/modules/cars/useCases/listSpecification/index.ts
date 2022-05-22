import { SpecificationsRepository } from '../../repositories/implemetantions/SpecificationsRepository';
import { ListSpecificationController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specifcationsRepository = SpecificationsRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specifcationsRepository
);
const listSpecificationsController = new ListSpecificationController(
  listSpecificationsUseCase
);

export { listSpecificationsController };
