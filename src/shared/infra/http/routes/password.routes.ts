import { Router } from 'express';

import { ResetPasswordUserController } from '../../../../modules/accounts/useCases/ResetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotMailPasswordMailController =
  new SendForgotPasswordMailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotMailPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
