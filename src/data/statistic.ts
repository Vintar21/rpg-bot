import { Dice, DiceResult } from '../utils/dice-utils';
import { bold, indent, line, underline } from '../utils/discord-utils';

export class Statistic {
  dice: Dice;
  rolls: number[];

  constructor(diceResult: DiceResult) {
    this.dice = diceResult.dice;
    this.rolls = [diceResult.result];
  }

  get mean(): number {
    if (this.totalRolls > 0) {
      let sum: number = 0;
      this.rolls.forEach((roll) => (sum += roll));
      return sum / this.totalRolls;
    }
    return NaN;
  }

  get max(): number {
    if (this.totalRolls > 0) {
      let max: number = this.rolls[0];
      this.rolls.forEach((roll) => (max = roll > max ? roll : max));
      return max;
    }
    return NaN;
  }

  get min(): number {
    if (this.totalRolls > 0) {
      let min: number = this.rolls[0];
      this.rolls.forEach((roll) => (min = roll < min ? roll : min));
      return min;
    }
    return NaN;
  }

  get totalRolls(): number {
    return this.rolls.length;
  }

  addRoll(value: number) {
    this.rolls.push(value);
  }

  stringProperty(name: string, value: number): string {
    return line(indent(underline(name + ' :') + ' ' + value.toString()));
  }

  toString(): string {
    const title: string = line(
      underline(bold(`Stats on dices ${this.dice.value} :`)),
    );
    const numberRolls: string = this.stringProperty('Rolls', this.totalRolls);
    const mean: string = this.stringProperty('Mean', this.mean);
    const max: string = this.stringProperty('Max', this.max);
    const min: string = this.stringProperty('Min', this.min);
    return title + numberRolls + mean + max + min;
  }

  convertToJSONObject(): any {
    return {
      dice: this.dice.value,
      rolls: this.rolls,
    };
  }
}
