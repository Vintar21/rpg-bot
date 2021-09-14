import { User } from "discord.js";
import { emptyLine } from "../utils/discord-utils";
import { DiceResult } from "..//utils/dice-utils";
import { Statistic } from "./statistic";

export class RollUser {
    user: User;
    statistics: Statistic[] = [];

    constructor(user: User) {
        this.user = user;
    }

    addRoll(roll: DiceResult) {
        let added: boolean = false;
        this.statistics.forEach((stat) => {
            // TODO equals function override
            if (stat.dice.value === roll.dice.value) {
                added = true;
                stat.addRoll(roll.result);
            }
        });

        if (!added) {
            this.statistics.push(new Statistic(roll))
        }
    }

    get statsString(): string {
        let stats: string = '';
        this.statistics.forEach((stat) => stats += stat.toString() + emptyLine());
        return stats;
    }
}