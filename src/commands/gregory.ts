import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class GregoryCommand implements Command {

  private static imagePath: string = './src/img/gregory.png';

  commandNames = ['gregory', 'diplome'];

  getHelpMessage(commandPrefix: string): string {
    return `${commandPrefix}gregory/diplome: return the diploma of Gregory `;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
      
      await parsedUserCommand.originalMessage.channel.send({files: [
        { attachment: GregoryCommand.imagePath }
    ]}).catch((error) => console.log(error));
    }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
