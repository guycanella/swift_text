import { z } from 'zod';

export interface ProtocolMap {
  ping(): 'pong';
}

export const PingResponseSchema = z.literal('pong');
