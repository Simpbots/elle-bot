import { RunFunction } from '../types/event';
const name: string = 'ready';
const run: RunFunction = async(client) => {
    client.logger.success(`Logged in as ${client.user.tag}`);
} 

export { name, run }
