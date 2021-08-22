import { Message } from 'discord.js-light'

export interface EditSnipe {
    messageOld: Message;
    messageNew: Message;
}