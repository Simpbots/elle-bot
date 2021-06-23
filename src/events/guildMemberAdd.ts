import { RunFunction } from '../types/event';
import { GuildMember, MessageEmbed } from 'discord.js';

const name: string = 'guildMemberAdd';
const run: RunFunction = async(client, member: GuildMember) => {
    const embed = new MessageEmbed({ description: "Thankyou for joining, and we hope you'll have a nice stay. don't forget to read the rules and greetings channel! <3", color: '#C884FF'}).setImage('https://cdn.glitch.com/7df2aba4-c181-4add-b792-2b6887934450%2Fezgif.com-gif-maker.gif?v=1616163332395').setFooter('✩‧₊*:・𝙨𝙞𝙢𝙥 𝙗𝙤𝙩𝙨  ･:*₊‧✩', client.user.avatarURL()).setTimestamp()
    
    const channel = member.guild.channels.cache.get('807281032641904640')
    if(!channel.isText()) return
    return channel.send(`**WELCOME TO _✩‧₊:・𝙨𝙞𝙢𝙥 𝙗𝙤𝙩𝙨  ･:₊‧✩_** ${member}`, [embed]) 
}

export { name, run }
