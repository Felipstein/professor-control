import { Express } from 'express';

export function listen(app: Express, port: string | number) {
  return new Promise((resolve) => {
    app.listen(port, () => resolve(undefined));
  });
}
