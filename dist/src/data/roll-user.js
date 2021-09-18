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
exports.RollUser = void 0;
var discord_utils_1 = require("../utils/discord-utils");
var statistic_1 = require("./statistic");
var fs = __importStar(require("fs"));
var RollUser = /** @class */ (function () {
    function RollUser(user) {
        this.statistics = [];
        this.user = user;
    }
    RollUser.prototype.addRoll = function (roll) {
        var added = false;
        this.statistics.forEach(function (stat) {
            // TODO equals function override
            if (stat.dice.value === roll.dice.value) {
                added = true;
                stat.addRoll(roll.result);
            }
        });
        if (!added) {
            this.statistics.push(new statistic_1.Statistic(roll));
        }
    };
    Object.defineProperty(RollUser.prototype, "statsString", {
        get: function () {
            var stats = '';
            this.statistics.forEach(function (stat) { return stats += stat.toString() + discord_utils_1.emptyLine(); });
            return stats;
        },
        enumerable: false,
        configurable: true
    });
    RollUser.prototype.exportToJSON = function () {
        var jsonUser = JSON.stringify({
            userId: this.user.id,
            userName: this.user.username,
            stats: this.statistics.map(function (stat) { return stat.convertToJSONObject(); })
        });
        fs.writeFile("./jsons/" + this.user.id + ".json", jsonUser, function (err) {
            if (err) {
                return console.error(err);
            }
        });
        console.log("JSON file created for user " + this.user.username);
        // UsersManager.loadStats();
    };
    return RollUser;
}());
exports.RollUser = RollUser;
//# sourceMappingURL=roll-user.js.map