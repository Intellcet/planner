import express from 'express';

import Db from '../db/Db';
import UserManager from '../managers/UserManager';
import apiAnswer from './ApiAnswer';

const router = express.Router();

type RouterOptions = {
  db: Db;
  userManager: UserManager;
};

class Router {
  constructor(options: RouterOptions) {
    const { db, userManager } = options;

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
  }

  getRouter() {
    return router;
  }
}

export default Router;
