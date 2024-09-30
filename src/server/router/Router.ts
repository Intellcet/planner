import express from 'express';

import apiAnswer from './ApiAnswer';
import UserManager from '../managers/UserManager';
import TaskManager from '../managers/TaskManager';
import CommentManager from '../managers/CommentManager';

const router = express.Router();

type RouterOptions = {
  userManager: UserManager;
  taskManager: TaskManager;
  commentManager: CommentManager;
};

class Router {
  constructor(options: RouterOptions) {
    const { userManager, taskManager, commentManager } = options;

    /**
     * @swagger
     * /:
     *   get:
     *     tags:
     *       - info
     *     summary: Check server.
     *     description: Check server.
     *     responses:
     *       '200':
     *         description: A successful response
     */
    router.get('/', async (req: any, res: any) => {
      res.send('server is working!');
    });

    /**
     * @swagger
     * /login:
     *   post:
     *     tags:
     *       - user
     *     summary: Auth in system.
     *     description: Auth in system.
     *     requestBody:
     *         description: Optional description in *Markdown*
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 login:
     *                   type: string
     *                   example: 'vasya'
     *                 password:
     *                   type: string
     *                   example: '4a2d247d0c05a4f798b0b03839d94cf0'
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: number
     *                       example: 1
     *                     name:
     *                       type: number
     *                       example: 'Vasya'
     *                     login:
     *                       type: string
     *                       example: 'vasya'
     *                     password:
     *                       type: string
     *                       example: '*********'
     *                     email:
     *                       type: string
     *                       example: 'asd@asd.rt'
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
    router.post('/login', async (req: any, res: any) => {
      const { login, password } = req.body;

      const result = await userManager.login(login, password);

      if (!result) {
        res.send(apiAnswer.error(2010));
        return;
      }

      res.send(apiAnswer.answer(result));
    });

    /**
     * @swagger
     * /registration:
     *   post:
     *     tags:
     *       - user
     *     summary: Registration in system.
     *     description: Registration in system.
     *     requestBody:
     *         description: Optional description in *Markdown*
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 login:
     *                   type: string
     *                   example: 'vasya'
     *                 password:
     *                   type: string
     *                   example: '4a2d247d0c05a4f798b0b03839d94cf0'
     *                 name:
     *                   type: string
     *                   example: 'Vasya Pupkin'
     *                 email:
     *                   type: string
     *                   example: 'sad@we.ty'
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: boolean
     *                   example: true
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
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

    /**
     * @swagger
     * /task:
     *   get:
     *     tags:
     *       - task
     *     summary: Get task.
     *     description: Get task.
     *     parameters:
     *       - in: query
     *         name: 'id'
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: number
     *                       example: 1
     *                     creator:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                         login:
     *                           type: string
     *                         password:
     *                           type: string
     *                         name:
     *                           type: string
     *                         email:
     *                           type: string
     *                       example: { id: 1, login: 'Vasya', password: '*******', name: 'Vasilii', email: 'sdf@fgd.rt' }
     *                     participants:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           id:
     *                             type: number
     *                           login:
     *                             type: string
     *                           password:
     *                             type: string
     *                           name:
     *                             type: string
     *                           email:
     *                             type: string
     *                       example: [{ id: 1, login: 'Vasya', password: '*******', name: 'Vasilii', email: 'sdf@fgd.rt' }]
     *                     status:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                         name:
     *                           type: string
     *                       example: { id: 1, name: 'New' }
     *                     title:
     *                       type: string
     *                       example: 'New title'
     *                     description:
     *                       type: string
     *                       example: 'New description'
     *                     finishTime:
     *                       type: string
     *                       example: '10.10.2024'
     *                     labels:
     *                       type: array
     *                       items:
     *                         type: string
     *                       example: ['dese', 'hyt']
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
    router.get('/task', async (req: any, res: any) => {
      const { taskId } = req.query;

      const task = await taskManager.getTask(taskId);

      if (!task) {
        res.send(apiAnswer.error(3020));
        return;
      }

      res.send(apiAnswer.answer(task));
    });

    /**
     * @swagger
     * /task:
     *   post:
     *     tags:
     *       - task
     *     summary: Create task.
     *     description: Create task.
     *     requestBody:
     *         description: Data for creating task
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 creator:
     *                   type: number
     *                   example: 1
     *                 participants:
     *                   type: array
     *                   items:
     *                     type: number
     *                   example: [1, 2, 3]
     *                 status:
     *                   type: number
     *                   example: 2
     *                 title:
     *                   type: string
     *                   example: 'New title'
     *                 description:
     *                   type: string
     *                   example: 'New description'
     *                 finishTime:
     *                   type: string
     *                   example: '10.10.2024'
     *                 labels:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ['dese', 'hyt']
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: number
     *                   example: 1
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
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

    /**
     * @swagger
     * /task:
     *   put:
     *     tags:
     *       - task
     *     summary: Update task.
     *     description: Update task.
     *     requestBody:
     *         description: Each field is not required, except id
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                   example: 1
     *                 creator:
     *                   type: number
     *                   example: 1
     *                 participants:
     *                   type: array
     *                   items:
     *                     type: number
     *                   example: [1, 2, 3]
     *                 status:
     *                   type: number
     *                   example: 2
     *                 title:
     *                   type: string
     *                   example: 'New title'
     *                 description:
     *                   type: string
     *                   example: 'New description'
     *                 finishTime:
     *                   type: string
     *                   example: '10.10.2024'
     *                 labels:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ['dese', 'hyt']
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: boolean
     *                   example: true
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
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

    /**
     * @swagger
     * /task:
     *   delete:
     *     tags:
     *       - task
     *     summary: Delete task.
     *     description: Delete task.
     *     parameters:
     *       - in: query
     *         name: 'taskId'
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'ok'
     *                 data:
     *                   type: boolean
     *                   example: true
     *       '204':
     *         description: В коде нет статусов кодов кроме 200, тут и далее будут описаны ошибки
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: 'error'
     *                 data:
     *                   type: string
     *                   example: 'Текст ошибки'
     */
    router.delete('/task', async (req: any, res: any) => {
      const { taskId } = req.query;

      const result = await taskManager.deleteTask(taskId);

      if (result) {
        res.send(apiAnswer.answer(result));
        return;
      }

      res.send(apiAnswer.error(3040));
    });

    router.post('/comment', async (req: any, res: any) => {
      const { authorId, taskId, text } = req.body;

      if (!authorId || !taskId || !text) {
        res.send(apiAnswer.error(1000));
        return;
      }

      const result = await commentManager.createComment(authorId, taskId, text);

      if (result) {
        res.send(apiAnswer.answer(result));
        return;
      }

      res.send(apiAnswer.error(4010));
    });
  }

  getRouter() {
    return router;
  }
}

export default Router;
