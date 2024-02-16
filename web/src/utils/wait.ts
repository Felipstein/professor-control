import { random } from './random';

export const wait = (ms = random(500, 1000)) =>
  new Promise((resolve) => setTimeout(resolve, ms));
