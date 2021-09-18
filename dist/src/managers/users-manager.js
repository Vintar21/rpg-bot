"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersManager = void 0;
var roll_user_1 = require("../data/roll-user");
var fs = __importStar(require("fs"));
var server_1 = require("../server");
var dice_utils_1 = require("../utils/dice-utils");
var UsersManager = /** @class */ (function () {
    function UsersManager() {
    }
    UsersManager.users = function () {
        return this.rollUsers;
    };
    UsersManager.addUser = function (user) {
        this.rollUsers.push(user);
    };
    UsersManager.loadStats = function () {
        var jsonsFolder = './jsons/';
        fs.readdir(jsonsFolder, function (err, files) {
            files.forEach(function (file) {
                file = jsonsFolder + file;
                var content = fs.readFileSync(file, 'utf8');
                var loadedUser = JSON.parse(content);
                var rollUser = UsersManager.getUser(loadedUser.userId);
                console.log(rollUser);
                console.log(loadedUser);
                if (rollUser) {
                    loadedUser.stats.forEach(function (stat) { return stat.rolls.forEach(function (roll) { return rollUser.addRoll(new dice_utils_1.DiceResult(new dice_utils_1.Dice(stat.dice), roll)); }); });
                }
            });
        });
    };
    UsersManager.getUser = function (userId) {
        for (var _i = 0, _a = this.rollUsers; _i < _a.length; _i++) {
            var rollUser_1 = _a[_i];
            if (rollUser_1.user.id === userId) {
                return rollUser_1;
            }
        }
        var newRollUser = undefined;
        server_1.getClient().users.cache.forEach(function (user) {
            if (user.username === 'Vintar') {
                console.log(user.id);
                console.log(userId);
                console.log(user.id === userId);
            }
            if (user.id === userId) {
                newRollUser = user;
            }
        });
        var rollUser = undefined;
        if (newRollUser) {
            rollUser = new roll_user_1.RollUser(newRollUser);
            this.addUser(rollUser);
        }
        return rollUser;
    };
    UsersManager.rollUsers = [];
    return UsersManager;
}());
exports.UsersManager = UsersManager;
//# sourceMappingURL=users-manager.js.map