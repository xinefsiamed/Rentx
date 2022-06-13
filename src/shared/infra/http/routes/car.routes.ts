import { Router } from 'express';

import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carRoutes };
