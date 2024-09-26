import express from 'express';

import apiAnswer from './ApiAnswer';
import UserManager from '../managers/UserManager';
import TaskManager from '../managers/TaskManager';

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

    router.get('/task', async (req: any, res: any) => {
      const { taskId } = req.query;

      const task = await taskManager.getTask(taskId);

      if (!task) {
        res.send(apiAnswer.error(3020));
        return;
      }

      res.send(apiAnswer.answer(task));
    });

    router.post('/task', async (req: any, res: any) => {
      const {
        creatorId,
        statusId,
        title,
        description,
        labels,
        finishTime = null,
        participants = [],
      } = req.body;

      const result = await taskManager.createTask(
        creatorId,
        statusId,
        title,
        description,
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

    router.put('/task', async (req: any, res: any) => {
      const {
        id,
        status = null,
        title = null,
        description = null,
        labels = null,
        finishTime = null,
        participants = null,
      } = req.body;

      const result = await taskManager.updateTask({
        id,
        title,
        status,
        description,
        labels,
        finishTime,
        participants,
      });

      if (result) {
        res.send(apiAnswer.answer(result));
        return;
      }

      res.send(apiAnswer.error(3030));
    });
  }

  getRouter() {
    return router;
  }
}

export default Router;
