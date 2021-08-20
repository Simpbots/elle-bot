import { RunFunction } from '../types/event';
import { Message } from 'discord.js';
import { EditSnipe } from '../types/editsnipe';

const name: string = 'messageUpdate';
const run: RunFunction = async (client, messageOld: Message, messageNew: Message) => {
    if (messageOld.author.bot) return
    const data: EditSnipe = { messageOld: messageOld, messageNew: messageNew };
    client.editsnipes.set(messageOld.channel.id, data)
}

export { name, run }