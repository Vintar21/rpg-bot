import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { emptyLine, mentionUser } from '../utils/discord-utils';
import { RollUser } from '../data/roll-user';
import { UsersManager } from '../managers/users-manager';


export class StatsCommand implements Command {

  commandNames = ['stats', 'stat'];

  getHelpMessage(commandPrefix: string): string {
    return `${commandPrefix}stats: return stats on your rolls `;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
      const users: RollUser[] = UsersManager.users();
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
