import { UsersManager } from '../managers/users-manager';
import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class ExportCommand implements Command {
  commandNames = ['export'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    UsersManager.users().forEach((user) => user.exportToJSON());
    await parsedUserCommand.originalMessage.reply('Done');
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
