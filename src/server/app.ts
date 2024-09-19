import express from 'express';
import cors from 'cors';
import http from 'http';

import Settings from './settings';
import Db from './db/Db';

const app = express();
const server = new http.Server(app);
const db = new Db({ dbName: Settings.dbName });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

server.listen(8080, () => {
  console.log('Server started at 8080 port');
});
