import { User } from "discord.js";
import { UsersManager } from "../managers/users-manager";
import { RollUser } from "../data/roll-user";
import { DiceResult } from "./dice-utils";

export function logRoll(diceResults: DiceResult[], user: User) {
    let currentUser: RollUser;
    UsersManager.users().forEach((rollUser) => {
      if (rollUser.user.id === user.id) {
        currentUser = rollUser;
      }
    });
    if (!UsersManager.users().some((rollUser) => rollUser.user.id === user.id)) {
      currentUser = new RollUser(user);
      UsersManager.addUser(currentUser);
    }
  
    diceResults.forEach((diceResult) => {
      currentUser.addRoll(diceResult)
    });
  }