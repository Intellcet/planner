import express from 'express';
import cors from 'cors';
import http from 'http';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import Settings from './settings';
import Router from './router/Router';
import Db from './db/Db';
import UserManager from './managers/UserManager';
import TaskManager from './managers/TaskManager';
import CommentManager from './managers/CommentManager';

const app = express();
const server = new http.Server(app);
const db = new Db({ dbName: Settings.dbName });
const userManager = new UserManager({ db });
const taskManager = new TaskManager({ db });
const commentManager = new CommentManager({ db });
const router = new Router({ userManager, taskManager, commentManager });
const swaggerDocs = swaggerjsdoc(Settings.swagger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(router.getRouter());

server.listen(8080, () => {
  console.log('Server started at 8080 port');
});
