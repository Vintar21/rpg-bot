import { Client, Intents, Message } from 'discord.js';
import { CommandHandler } from './command_handler';
import { BotConfig, config } from './config/config';
import { UsersManager } from './managers/users-manager';

/** Pre-startup validation of the bot config. */
function validateConfig(botConf: BotConfig) {
  if (!botConf.token) {
    throw new Error('You need to specify your Discord bot token!');
  }
}

export function getClient(): Client {
  return client;
}

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);

const client: Client = new Client({ws: {intents: Intents.ALL}});

UsersManager.loadStats();

client.on('ready', () => {
  console.log('Bot has started');
});

client.on('message', (message: Message) => {
  commandHandler.handleMessage(message);
});

client.on('error', (e) => {
  console.error('Discord client error!', e);
});

client.login(config.token);
