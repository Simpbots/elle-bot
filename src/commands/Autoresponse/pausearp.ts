import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'pausearp';
const description: string = 'Pause auto response';
const category: string = "Autoresponse";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const aliases: string[] = ['parp'];
const run: RunFunction = async(client, message, args) => {
    if(client.pausearp == true) {
        client.pausearp = false
        return message.channel.send('Success unpaused autoresponse')
    }else {
        client.pausearp = true
        return message.channel.send('Success paused autoresponse')
    }
}

export { name, description, run, category, aliases, permissionUser }