import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'pausepap';
const description: string = 'Pause Pap';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message) => {
    if(client.pausepap == true) {
        client.pausepap = false
        return message.channel.send('Success unpaused pap')
    }else {
        client.pausepap = true
        return message.channel.send('Success paused pap')
    }
}

export { name, description, run, category, permissionUser }