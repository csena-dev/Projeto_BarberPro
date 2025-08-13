import express, { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'; 
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { UpdateUserController } from './controllers/user/UpdatedUserController';

import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutController } from './controllers/haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutController } from './controllers/haircut/CountHaircutController';
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController';


import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleContorller } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';

import { SubscribeController } from './controllers/subscription/SubscribeController';
import { WebhooksController } from './controllers/subscription/webhooksController';
import { CreatePortalController } from './controllers/subscription/CreatePortalController';


import { isAuthenticated } from './middlewares/isAuthenticated';


const router = Router();


// -- ROTAS USER ---
router.post('/users', new CreateUserController().handle) 
// ROTAS SESSION
router.post('/session', new AuthUserController().handle)
//ROTAS ME
router.get('/me', isAuthenticated, new DetailUserController().handle)
//ROTAS users/update
router.put('/users', isAuthenticated, new UpdateUserController().handle)




//-- ROTA HAIRCUTS / MODELOS DE CORTES --
router.post('/haircut',isAuthenticated, new CreateHaircutController().handle)

router.get('/listhaircut', isAuthenticated, new ListHaircutController().handle)

router.put('/updatehaircut', isAuthenticated, new UpdateHaircutController().handle)

router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle)

router.get('/haircut/count', isAuthenticated, new CountHaircutController().handle)

router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)


// -- ROTA SCHEDULE / SERVICOS --

router.post('/schedule', isAuthenticated, new NewScheduleController().handle)

router.get('/schedule/list', isAuthenticated, new ListScheduleContorller().handle)

router.delete('/schedule/finish', isAuthenticated, new FinishScheduleController().handle)


// -- ROTA PAGAMENTOS --

router.post('/subscribe', isAuthenticated, new SubscribeController().handle)

router.post('/webhooks', express.raw({ type: 'application/json' }), new WebhooksController().handle)

router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)

export { router };