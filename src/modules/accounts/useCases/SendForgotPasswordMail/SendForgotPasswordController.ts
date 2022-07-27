import { Request, Response } from 'express';
import { send } from 'process';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotoPasswordUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotoPasswordUseCase.execute(email);

    return res.send();
  }
}

export { SendForgotPasswordController };
