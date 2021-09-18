"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoll = void 0;
var users_manager_1 = require("../managers/users-manager");
var roll_user_1 = require("../data/roll-user");
function logRoll(diceResults, user) {
    var currentUser;
    users_manager_1.UsersManager.users().forEach(function (rollUser) {
        if (rollUser.user.id === user.id) {
            currentUser = rollUser;
        }
    });
    if (!users_manager_1.UsersManager.users().some(function (rollUser) { return rollUser.user.id === user.id; })) {
        currentUser = new roll_user_1.RollUser(user);
        users_manager_1.UsersManager.addUser(currentUser);
    }
    diceResults.forEach(function (diceResult) {
        currentUser.addRoll(diceResult);
    });
}
exports.logRoll = logRoll;
//# sourceMappingURL=server-utils.js.map