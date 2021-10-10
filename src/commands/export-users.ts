import { UsersManager } from '../managers/users-manager';
import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class ExportCommand implements Command {
  commandNames = ['export', 'e'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}export to export users stats in jsons files`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    UsersManager.users().forEach((user) => user.exportToJSON());
    await parsedUserCommand.originalMessage.reply('Stats exported');
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return (
      parsedUserCommand.originalMessage.member !== null &&
      parsedUserCommand.originalMessage.member.roles.cache.some(
        (role) => role.name === 'Admin',
      )
    );
  }
}
