import { Dice, DiceUtils, DiceResult, Bonus } from '../utils/dice-utils';
import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { emptyLine, line, bold, underline, indent, mentionUser } from '../utils/discord-utils';
import { logRoll } from '../utils/server-utils';


export class LuckCommand implements Command {

  commandNames = ['luck', 'chance', 'l'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}roll 1dX to roll a dice X`;
  }

  private rollOneDice(value: number): DiceResult {
    return DiceUtils.roll(new Dice(value));
  }

  private getDefaultAnswer(luckCheck: DiceResult, modifier: DiceResult): string {
    let answer: string = '';
    answer += line(underline(bold(`Luck check`)));
    answer += line(indent(underline(`Luck :`) + ` ${luckCheck.result}`));
    answer += line(indent(underline(`Modifier :`) + ` +/-${modifier.result} of luck`));

    return answer;
  }

  private getCheckedAnswer(passed: boolean, luckCheck: DiceResult, modifier: DiceResult): string {
    let answer: string = '';
    if (passed) {
        answer += line(bold(`Luck check passed `) + `✅ (${luckCheck.result})`);
        answer += line(`Decrease your luck of ${modifier.result}`);
    } else {
        answer += line(bold(`Luck check failed `) + `❌ (${luckCheck.result})`);
        answer += line(`Increase your luck of ${modifier.result}`);
    }
    return answer;
  }

  private isValidArg(args: string[]): boolean {
    return args.length >= 1 && !isNaN(parseInt(args[0])) && parseInt(args[0]) >= 1 && parseInt(args[0]) <= 100;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {

    const luckCheck: DiceResult = this.rollOneDice(100);
    const modifier: DiceResult = this.rollOneDice(10);
    let answer: string;
    logRoll([luckCheck, modifier], parsedUserCommand.originalMessage.author);

    if (this.isValidArg(parsedUserCommand.args)) {
        const luckValue: boolean = luckCheck.result <= parseInt(parsedUserCommand.args[0]);
        answer = mentionUser(parsedUserCommand) + emptyLine() + this.getCheckedAnswer(luckValue, luckCheck, modifier);

    } else {
        answer = mentionUser(parsedUserCommand) + emptyLine() + this.getDefaultAnswer(luckCheck, modifier);
    }

    await parsedUserCommand.originalMessage.channel.send(answer);
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
