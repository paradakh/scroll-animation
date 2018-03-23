import { Env, Offset } from './interfaces';

export type PositionFn = (offset: Offset, env: Env) => number;
