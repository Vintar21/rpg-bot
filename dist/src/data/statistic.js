"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistic = void 0;
var discord_utils_1 = require("../utils/discord-utils");
var Statistic = /** @class */ (function () {
    function Statistic(diceResult) {
        this.dice = diceResult.dice;
        this.rolls = [diceResult.result];
    }
    Object.defineProperty(Statistic.prototype, "mean", {
        get: function () {
            if (this.totalRolls > 0) {
                var sum_1 = 0;
                this.rolls.forEach(function (roll) { return sum_1 += roll; });
                return sum_1 / this.totalRolls;
            }
            return NaN;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Statistic.prototype, "max", {
        get: function () {
            if (this.totalRolls > 0) {
                var max_1 = this.rolls[0];
                this.rolls.forEach(function (roll) { return max_1 = (roll > max_1) ? roll : max_1; });
                return max_1;
            }
            return NaN;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Statistic.prototype, "min", {
        get: function () {
            if (this.totalRolls > 0) {
                var min_1 = this.rolls[0];
                this.rolls.forEach(function (roll) { return min_1 = (roll < min_1) ? roll : min_1; });
                return min_1;
            }
            return NaN;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Statistic.prototype, "totalRolls", {
        get: function () {
            return this.rolls.length;
        },
        enumerable: false,
        configurable: true
    });
    Statistic.prototype.addRoll = function (value) {
        this.rolls.push(value);
    };
    Statistic.prototype.stringProperty = function (name, value) {
        return discord_utils_1.line(discord_utils_1.indent(discord_utils_1.underline(name + ' :') + ' ' + value.toString()));
    };
    Statistic.prototype.toString = function () {
        var title = discord_utils_1.line(discord_utils_1.underline(discord_utils_1.bold("Stats on dices " + this.dice.value + " :")));
        var numberRolls = this.stringProperty('Rolls', this.totalRolls);
        var mean = this.stringProperty('Mean', this.mean);
        var max = this.stringProperty('Max', this.max);
        var min = this.stringProperty('Min', this.min);
        return title + numberRolls + mean + max + min;
    };
    Statistic.prototype.convertToJSONObject = function () {
        return {
            dice: this.dice.value,
            rolls: this.rolls
        };
    };
    return Statistic;
}());
exports.Statistic = Statistic;
//# sourceMappingURL=statistic.js.map