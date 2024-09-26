import express from 'express';
import cors from 'cors';
import http from 'http';

import Settings from './settings';
import Router from './router/Router';
import Db from './db/Db';
import UserManager from './managers/UserManager';

const app = express();
const server = new http.Server(app);
const db = new Db({ dbName: Settings.dbName });
const userManager = new UserManager({ db });
const router = new Router({ db, userManager });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(router.getRouter());

server.listen(8080, () => {
  console.log('Server started at 8080 port');
});
