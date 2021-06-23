import { RunFunction } from '../../types/command';

const name: string = 'avatar';
const description: string = 'Return avatar';
const aliases: string[] = ['av'];
const category: string = "Fun";
const run: RunFunction = async(client, message, args) => {
    if(args.length == 0) {
        return message.channel.send(client.embed({ title: `${message.author.username}'s avatar`}).setImage(message.author.displayAvatarURL({dynamic: true, size: 1024})).setURL(message.author.displayAvatarURL({dynamic: true, size: 1024})))
    }
    if(!isNaN(args[0])) {
        const themember = message.guild.members.resolve(args[0]);
        return message.channel.send(client.embed({ title: `${themember.user.username}'s avatar`}).setImage(themember.user.displayAvatarURL({dynamic: true, size: 1024})).setURL(themember.user.displayAvatarURL({dynamic: true, size: 1024})))
    }
    if(message.mentions.members) {
        if(message.mentions.members.size == 0) {
            const themember = message.mentions.members.first();
            return message.channel.send(client.embed({ title: `${themember.user.username}'s avatar`}).setImage(themember.user.displayAvatarURL({dynamic: true, size: 1024})).setURL(themember.user.displayAvatarURL({dynamic: true, size: 1024})))
        }else{
            message.mentions.members.forEach(themember => {
                return message.channel.send(client.embed({ title: `${themember.user.username}'s avatar`}).setImage(themember.user.displayAvatarURL({dynamic: true, size: 1024})).setURL(themember.user.displayAvatarURL({dynamic: true, size: 1024})))
            })
        }
    }
}

export { name, description, run, category, aliases }