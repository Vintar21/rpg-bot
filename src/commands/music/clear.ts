import { MusicManager } from '../../managers/music-manager';
import { CommandContext } from '../../models/command_context';
import { Command } from '../command';

export class ClearCommand implements Command {
  commandNames = ['clear'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  //TODO ytpl et ytsr installed maybe for nothing
  async run(parsedUserCommand: CommandContext): Promise<void> {
    MusicManager.clearQueue();
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
