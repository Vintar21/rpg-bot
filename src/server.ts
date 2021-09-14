import Discord, { Message, User } from 'discord.js';
import { CommandHandler } from './command_handler';
import { BotConfig, config } from './config/config';
import { RollUser } from './data/roll-user';
import { DiceResult } from './utils/dice-utils';

/** Pre-startup validation of the bot config. */
function validateConfig(botConf: BotConfig) {
  if (!botConf.token) {
    throw new Error('You need to specify your Discord bot token!');
  }
}

//TODO mettre autre part (juste garder getUsers)
export function logRoll(diceResults: DiceResult[], user: User) {
  let currentUser: RollUser;
  users.forEach((rollUser) => {
    if (rollUser.user.id === user.id) {
      currentUser = rollUser;
    }
  });
  if (!users.some((rollUser) => rollUser.user.id === user.id)) {
    currentUser = new RollUser(user);
    users.push(currentUser);
  }

  diceResults.forEach((diceResult) => {
    currentUser.addRoll(diceResult)
  });
}

export function getUsers(): RollUser[] {
  return users;
}

const users: RollUser[] = [];

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);

const client = new Discord.Client();

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
