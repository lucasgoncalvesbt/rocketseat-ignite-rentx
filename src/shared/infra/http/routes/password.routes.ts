import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const forgotPasswordController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', forgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
