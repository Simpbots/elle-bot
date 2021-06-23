import { RunFunction } from '../../types/command';

const name: string = 'help';
const description: string = 'Give information about existed commands';
const category: string = "Utility";
const run: RunFunction = async(client, message) => {
    const listcommandcategory = {}
    client.commands.forEach(a => {
        listcommandcategory[a.category] = client.commands.filter(b => b.category == a.category)
    })

    const prefix = client.listprefix[message.guild.id] || client.Config.prefix
    const commandlist = Object.keys(listcommandcategory).map(a => {
        return `**${a} commands**\n ${listcommandcategory[a].map(b => (`${'`'}${prefix} ${b.name}${'`'}`)).join('\n')}`
    })


    const embed = client.embed({ title: "Help", "description": "Here is the command you can use\n\n" + commandlist.join('\n\n')})
    return message.channel.send(embed)
}

export { name, description, run, category }