import { Message } from 'discord.js'

export interface EditSnipe {
    messageOld: Message;
    messageNew: Message;
}