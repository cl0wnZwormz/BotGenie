const fs = require('fs');
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));

module.exports = {
  name: 'help',
  description: 'List of all commands',
  execute(message, args) {
    let helpMessage = 'Selfbot v2\n';
    helpMessage += ' \n';

    const categories = fs.readdirSync(path.join(__dirname, '..'));

    for (const category of categories) {
      const commandFiles = fs.readdirSync(path.join(__dirname, '..', category)).filter(file => file.endsWith('.js'));
      helpMessage += `${category}\n`;
      for (const file of commandFiles) {
        const command = require(`../${category}/${file}`);
        helpMessage += `${config.prefix}${command.name} - ${command.description}\n`;
      }
      helpMessage += '\n';
    }

    message.channel.send(`\`\`\`\n${helpMessage}\n\`\`\``)
   .then(msg => {
        setTimeout(() => msg.delete(), 7500);
      })
   .catch(console.error);
  },
};