import { Express } from 'express';
import { Server } from 'node:http';

export function listen(app: Express | Server, port: string | number) {
  return new Promise((resolve) => {
    app.listen(port, () => resolve(undefined));
  });
}
