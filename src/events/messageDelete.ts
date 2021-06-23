import { RunFunction } from '../types/event';
import { Message } from 'discord.js';

const name: string = 'messageDelete';
const run: RunFunction = async(client, message: Message) => {
   if(message.author.bot) return
   client.snipes.set(message.channel.id, message)
}

export { name, run }