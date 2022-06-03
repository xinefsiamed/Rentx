import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  ensureAuthenticated,
  updateUserAvatarController.handle
);

export { usersRoutes };
