import { Bot } from '../client';
import { Message, PermissionResolvable } from 'discord.js';

export interface RunFunction {
    (client: Bot, message: Message, args: any[]): Promise<T>
}

export interface Command {
    name: string;
    category: string;
    aliases?: string[];
    permissionUser: PermissionResolvable[];
    permissionBot: PermissionResolvable[];
    description?: string;
    run: RunFunction 
}