import { User, UserManager } from "discord.js";
import { emptyLine } from "../utils/discord-utils";
import { DiceResult } from "..//utils/dice-utils";
import { Statistic } from "./statistic";
import * as fs from 'fs';
import { UsersManager } from "../managers/users-manager";

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

    exportToJSON(): any {
        const jsonUser: string = JSON.stringify({
            userId: this.user.id,
            userName: this.user.username,
            stats: this.statistics.map((stat) => stat.convertToJSONObject())
        });

        fs.writeFile(`./jsons/${this.user.id}.json`, jsonUser, function(err) {
            if (err) {
                return console.error(err);
            }});
            console.log(`JSON file created for user ${this.user.username}`);
        // UsersManager.loadStats();

    }
}