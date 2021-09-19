import { Dice, DiceUtils, DiceResult, Bonus } from '../utils/dice-utils';
import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { emptyLine, it, line, bold, underline, indent, mentionUser } from '../utils/discord-utils';
import { logRoll } from '../utils/server-utils';

interface Roll {
  totalDices: number;
  diceValue: number;
  isValid: boolean;
}

export class RollCommand implements Command {

  private totalSum: number = 0;

  defaultRoll: Roll = {totalDices: -1, diceValue: -1, isValid: false};
  commandNames = ['roll', 'r'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}roll 1dX to roll a dice X`;
  }

  private rollOneDice(value: number): DiceResult {
    return DiceUtils.roll(new Dice(value));
  }

  private rollOneType(totalDices: number, value: number): DiceResult[] {
    let results: DiceResult[] = [];
    for (let index = 0; index < totalDices; index++) {
      results.push(this.rollOneDice(value));
    }
    return results;
  }

  private parseArg(arg: string): Roll {
    let totalDices = NaN;
    let diceValue = NaN;
    arg = arg.replace(/d+/i, 'd');
    if(arg.includes('d')) {
      const argSplitted: string[] = arg.split('d');
      if (argSplitted.length === 2) {
        totalDices = parseInt(argSplitted[0]);
        diceValue = parseInt(argSplitted[1]);
      }
    } else if (!isNaN(parseInt(arg[0]))){
      totalDices = 1;
      diceValue = parseInt(arg);
    }
    if(!isNaN(totalDices) && !isNaN(diceValue)) {
      return {
        totalDices,
        diceValue,
        isValid: totalDices >= 1 && diceValue >=1 && totalDices <= 100 && diceValue <= 1000
      }
    }
    return this.defaultRoll;
  }

  private getAnswerForOneType(diceResults: DiceResult[], dice: Dice): string {
    if (diceResults.length !== 0) {
      const rollHeader: string = line(bold(underline(`Roll ${diceResults.length}d${dice.value} :`)));
      let rollBody: string = ``;
      let sum: number = 0
      let bonuses: Bonus[][] = [];
      for (let diceResult of diceResults) {
        rollBody += indent(`${diceResult.result} `);
        if (diceResult.hasBonus) {
          rollBody += it(`${diceResult.getBonus}`);
        }
        rollBody = line(rollBody);
        sum += diceResult.result;
        bonuses.push(diceResult.getBonus);
        diceResult.getBonus.forEach((bonus) => sum = bonus.applyBonus(sum));
      }
      this.totalSum += sum;
      const sumFooter: string = line(indent(underline(`Total d${dice.value} :`) + ` ${sum}`));
      return rollHeader + rollBody + sumFooter ;
    }
    return '';
  }

  private getAnswer(results: DiceResult[]): string {

    let groupedResult: Map<number,DiceResult[]> = new Map();
    results.forEach((result) => {
      const diceValue: number = result.dice.value;
      if(!groupedResult.has(diceValue)) {
        groupedResult.set(diceValue, [result]);
      } else {
        groupedResult.get(diceValue)?.push(result);
      }
    });
    let answer: string = '';
    groupedResult.forEach((diceResults, dice) => {
      answer += line(this.getAnswerForOneType(diceResults, new Dice(dice)));
    });
    const totalSumFooter: string = emptyLine() + line(underline(`Total all dices :`) + ` ${this.totalSum}`);
    return answer + totalSumFooter;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    this.totalSum = 0;
    const args: string[] = parsedUserCommand.args;
    if (args.length >= 1) {
      let results: DiceResult[] = [];
      let lastDiceResults: DiceResult = DiceResult.DEFAULT_DICE_RESULT;
      args.forEach((arg) => {
        for(let i in Bonus.bonusTypes) {
          const bonusType: string = Bonus.bonusTypes[i];
          if(arg.startsWith(bonusType) && lastDiceResults !== DiceResult.DEFAULT_DICE_RESULT) {
            const bonusValue: number = parseInt(arg.replace(bonusType, ''));
            if (!isNaN(bonusValue)) {
              lastDiceResults.addBonus(new Bonus(bonusType, bonusValue));
            }
            break;
          }
        }

        const roll: Roll = this.parseArg(arg);
        if (roll.isValid) {
          const dicesResults: DiceResult[] = this.rollOneType(roll.totalDices, roll.diceValue);
          lastDiceResults = dicesResults[dicesResults.length - 1];
          dicesResults.forEach((result) => {
            results.push(result);
          });

        }
      });

      if (results.length === 0) {
        await parsedUserCommand.originalMessage.reply('Invalid roll specified.');
        
      } else {
        logRoll(results, parsedUserCommand.originalMessage.author);
        const answer: string = mentionUser(parsedUserCommand) + emptyLine() + this.getAnswer(results);
  
        await parsedUserCommand.originalMessage.channel.send(answer);
      }
    }
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
