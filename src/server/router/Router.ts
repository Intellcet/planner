import express from 'express';

import UserManager from '../managers/UserManager';
import TaskManager from '../managers/TaskManager';
import apiAnswer from './ApiAnswer';

const router = express.Router();

type RouterOptions = {
  userManager: UserManager;
  taskManager: TaskManager;
};

class Router {
  constructor(options: RouterOptions) {
    const { userManager, taskManager } = options;

    router.get('/', async (req: any, res: any) => {
      res.send('server is working!');
    });

    router.post('/login', async (req: any, res: any) => {
      const { login, password } = req.body;

      const result = await userManager.login(login, password);

      if (!result) {
        res.send(apiAnswer.error(2010));
        return;
      }

      res.send(apiAnswer.answer(result));
    });

    router.post('/registration', async (req: any, res: any) => {
      const { name, login, password, email } = req.body;

      const result = await userManager.registration(
        name,
        login,
        password,
        email
      );

      if (!result) {
        res.send(apiAnswer.error(2001));
        return;
      }

      res.send(apiAnswer.answer(result));
    });

    router.get('/task', async (req: any, res: any) => {});

    router.post('/task', async (req: any, res: any) => {
      const {
        creatorId,
        statusId,
        title,
        descriptions,
        labels,
        finishTime = null,
        participants = [],
      } = req.body;

      const result = await taskManager.createTask(
        creatorId,
        statusId,
        title,
        descriptions,
        labels,
        participants,
        finishTime
      );

      if (result) {
        res.send(apiAnswer.answer(result));
        return;
      }

      res.send(apiAnswer.error(3010));
    });
  }

  getRouter() {
    return router;
  }
}

export default Router;
