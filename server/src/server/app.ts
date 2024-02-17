import 'express-async-errors';

import { createServer } from 'node:http';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { routes } from './routes';
import { initWebSocket } from './websocket';

const app = express();
const server = createServer(app);

const io = initWebSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
  }),
);

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin) {
        return callback(null, true);
      }

      const allowedOrigins = process.env.ORIGINS;

      if (allowedOrigins.includes(requestOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${requestOrigin} not allowed`), false);
    },
  }),
);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use(routes);

export { app, server, io };
