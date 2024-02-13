import { Router } from 'express';
import { autenticarUsuario } from '../../middlewares/autenticar.js';
import { soloRoles } from '../../middlewares/autorizar.js';
import { postUserController, getCurrentUserController, getUsersAdminController, getUsersByRolesController } from '../../controllers/apiR.controllers/usersRouter.controller.js';
import { User } from '../../models/User.model.js';
//import { responseSuccessfull } from '../../middlewares/responseSuccessfull.js'
//import { responseFailed } from '../../middlewares/responseFailed.js'

export const usersRouter = Router();


//usersRouter.use(responseFailed);
//usersRouter.use(responseSuccessfull);


usersRouter.post('/', autenticarUsuario, soloRoles(['usuario']), postUserController);
usersRouter.get('/current', autenticarUsuario, soloRoles(['usuario']), getCurrentUserController);
usersRouter.get('/admin', soloRoles(['admin']), getUsersAdminController);
usersRouter.get('/roles', soloRoles(['admin']), getUsersByRolesController);

export default usersRouter;

