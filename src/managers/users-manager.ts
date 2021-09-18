import { RollUser } from "../data/roll-user";
import * as fs from 'fs';
import { User } from "discord.js";
import { getClient } from "../server";
import { Dice, DiceResult } from "../utils/dice-utils";

interface UserJson {
    userId: string;
    username: string;
    stats: StatJson[];
}

interface StatJson {
    dice: number;
    rolls: number[]
}

export class UsersManager {

    private static rollUsers: RollUser[] = [];
    private static jsonsFolder: string = './jsons/';

    static users(): RollUser[] {
        return this.rollUsers;
      }
      
    static addUser(user: RollUser): void {
        this.rollUsers.push(user);
      }

    static loadStats() {
        if (!fs.existsSync(this.jsonsFolder)) {
            fs.mkdirSync(this.jsonsFolder);
        }

        fs.readdir(this.jsonsFolder, (err, files) => {
            files.forEach(file => {
                file = this.jsonsFolder + file
                const content: string = fs.readFileSync(file, 'utf8');
                const loadedUser: UserJson = JSON.parse(content) as UserJson;
                const rollUser: RollUser | undefined = UsersManager.getUser(loadedUser.userId);
                if (rollUser) {
                    loadedUser.stats.forEach(
                        (stat) => stat.rolls.forEach(
                            (roll) => rollUser.addRoll(new DiceResult(new Dice(stat.dice), roll))))
                }
            });
        });
    }

    static exportStats() {
        UsersManager.users().forEach((user) => user.exportToJSON());
    }

    static getUser(userId: string): RollUser | undefined {
        for(let rollUser of this.rollUsers) {
            if (rollUser.user.id === userId) {
                return rollUser;
            }
        }
        let newRollUser: User | undefined = undefined;
        getClient().users.cache.forEach((user) => {
            if (user.id === userId) {
                newRollUser = user;
            }
        });
       
        let rollUser: RollUser | undefined = undefined;
        if (newRollUser) {
            rollUser = new RollUser(newRollUser);
            this.addUser(rollUser);
        }
        return rollUser;
    }      
}