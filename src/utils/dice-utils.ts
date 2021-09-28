export class Dice {
  private maxValue: number;

  constructor(value: number) {
    this.maxValue = value;
  }

  get start(): number {
    return 1;
  }

  get value(): number {
    return this.maxValue;
  }

  get expectation(): number {
    return (this.value + this.start) / 2;
  }
}

export class Bonus {
  // TODO BOrdel pq c'esty si compliqué cette mezrdfe es, fkljdsnfdsqlk rtfq<wmslnvcsr<edjlkic
  // Faire un enum + fichier spécifique
  static bonusTypes = ['+', '-', '*', '/'];

  bonus: string;
  value: number;

  constructor(bonus: string, value: number) {
    this.bonus = bonus;
    this.value = value;
  }

  applyBonus(n: number): number {
    switch (this.bonus) {
      case '+':
        return n + this.value;
      case '-':
        return n - this.value;
      case '*':
        return n * this.value;
      case '/':
        return n / this.value;
    }
    return n;
  }

  toString(): string {
    return this.bonus + this.value.toString();
  }
}

export class DiceResult {
  static DEFAULT_DICE_RESULT: DiceResult = new DiceResult(new Dice(-1), -1);

  private diceReference: Dice;
  private diceResult: number;
  private bonus: Bonus[] = [];

  constructor(dice: Dice, result: number) {
    this.diceReference = dice;
    this.result = result;
  }

  get dice(): Dice {
    return this.diceReference;
  }

  get result(): number {
    return this.diceResult;
  }

  set result(value: number) {
    this.diceResult = value;
  }

  get isValid(): boolean {
    return this.result >= this.dice.start && this.result <= this.dice.value;
  }

  get getBonus(): Bonus[] {
    return this.bonus;
  }

  get hasBonus(): boolean {
    return this.bonus.length > 0;
  }

  addBonus(bonus: Bonus): void {
    this.bonus.push(bonus);
  }
}

export class DiceUtils {
  public static roll(dice: Dice): DiceResult {
    const rollResult: number = Math.floor(Math.random() * dice.value) + 1;
    return new DiceResult(dice, rollResult);
  }
}
