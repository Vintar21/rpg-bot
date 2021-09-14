import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { emptyLine, mentionUser } from '../utils/discord-utils';
import { getUsers } from '../server';
import { RollUser } from '../data/roll-user';


export class StatsCommand implements Command {

  commandNames = ['stats'];

  getHelpMessage(commandPrefix: string): string {
    return `${commandPrefix}stats: return stats on your number `;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
      const users: RollUser[] = getUsers();
      let text: string = '';
      users.forEach((user) => {
          if (user.user.id === parsedUserCommand.originalMessage.author.id) {
            text += user.statsString;
          }
      });

      const answer: string = mentionUser(parsedUserCommand) + emptyLine() + text;

      await parsedUserCommand.originalMessage.channel.send(answer);
    }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
