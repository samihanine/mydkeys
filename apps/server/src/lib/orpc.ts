import type { Context } from '../lib/context';
import { os } from '@orpc/server';

export const o = os.$context<Context>();
