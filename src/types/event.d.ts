import { Bot } from '../client';

export interface RunFunction {
    (client: Bot, ...args: any[]): Promise<T>
}

export interface Event {
    name: string;
    run: RunFunction;
}