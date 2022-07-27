import { Router } from 'express';

import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotMailPasswordMailController =
  new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotMailPasswordMailController.handle);

export { passwordRoutes };
