const { Client } = require("discord.js-selfbot-v13");
const fs = require('fs').promises;
const config = require('./config.json');
process.noDeprecation = true;

const client = new Client();

const loadCommands = async () => {
    const commandFiles = await fs.readdir('./commands');
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
};

client.once('ready', async () => {
    console.log('Connected!');
    console.log(`${config.prefix}help for a list of commands`);
    const user = await client.users.fetch(client.user.id);
    config.userId = user.id;

    loadCommands();
});

client.commands = new Map();

client.on('messageCreate', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot || message.author.id !== config.userId) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) {
        message.reply("Command doesn't exist.");
        return;
    }

    // Log the command and its arguments to the console
    if (args.length > 0) {
        console.log(`${config.prefix}${commandName} ${args.join(' ')}`);
    } else {
        console.log(`${config.prefix}${commandName}`);
    }

    try {
        const isValid = command.validateArgs ? command.validateArgs(args) : true;
        if (!isValid) {
            message.reply("invalid usage");
            return;
        }
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('nop');
    } finally {
        message.delete().catch(console.error);
    }
});

client.login(config.token);
