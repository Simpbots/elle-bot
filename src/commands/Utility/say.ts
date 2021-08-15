import { RunFunction } from '../../types/command';

const name: string = 'say';
const description: string = `Return embed messages`;
const category: string = "Utility";
const run: RunFunction = async(client, message, args) => {
	const embed = client.embed({ "description": args.join(' ') })
	return message.channel.send(embed)
}

export { name, description, category, run }
