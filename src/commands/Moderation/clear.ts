import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'clear';
const description: string = 'Bulk delete the messages';
const category: string = "Moderation";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS'];
const permissionBot: PermissionResolvable[] = ['MANAGE_CHANNELS'];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const run: RunFunction = async(client, message, args) => {
    if(message.channel.type == 'text' || message.channel.type == 'news') {
        message.delete()
        let deletevalue = Number(args[0]) || 5
        if(deletevalue > 100) return message.channel.send('value should be less than or equal to 100.')
        return message.channel.bulkDelete(deletevalue)
            .then(e => {
                message.channel.send(`Success deleted ${"`"}${deletevalue}${"`"} ${deletevalue == 1 ? 'message' : 'messages'}`)
                    .then(async x => {
                        await sleep(5000)
                        x.delete()
                    })
            })
    }
}

export { name, description, run, category, permissionUser, permissionBot }