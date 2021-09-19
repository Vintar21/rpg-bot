import { getClient } from '../server';
import { UsersManager } from '../managers/users-manager';
import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class LoadCommand implements Command {
  commandNames = ['load'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
      UsersManager.loadStats();
      await parsedUserCommand.originalMessage.reply('Done');
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return parsedUserCommand.originalMessage.member !== null 
    && parsedUserCommand.originalMessage.member.roles.cache.some((role) => role.name === 'Admin');
  }
}
