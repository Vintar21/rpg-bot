"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollCommand = void 0;
var dice_utils_1 = require("../utils/dice-utils");
var discord_utils_1 = require("../utils/discord-utils");
var server_utils_1 = require("../utils/server-utils");
var RollCommand = /** @class */ (function () {
    function RollCommand() {
        this.totalSum = 0;
        this.defaultRoll = { totalDices: -1, diceValue: -1, isValid: false };
        this.commandNames = ['roll'];
    }
    RollCommand.prototype.getHelpMessage = function (commandPrefix) {
        return "Use " + commandPrefix + "roll 1dX to roll a dice X";
    };
    RollCommand.prototype.rollOneDice = function (value) {
        return dice_utils_1.DiceUtils.roll(new dice_utils_1.Dice(value));
    };
    RollCommand.prototype.rollOneType = function (totalDices, value) {
        var results = [];
        for (var index = 0; index < totalDices; index++) {
            results.push(this.rollOneDice(value));
        }
        return results;
    };
    RollCommand.prototype.parseArg = function (arg) {
        var totalDices = NaN;
        var diceValue = NaN;
        if (arg.includes('d')) {
            var argSplitted = arg.split('d');
            if (argSplitted.length === 2) {
                totalDices = parseInt(argSplitted[0]);
                diceValue = parseInt(argSplitted[1]);
            }
        }
        else if (!isNaN(parseInt(arg[0]))) {
            totalDices = 1;
            diceValue = parseInt(arg);
        }
        if (!isNaN(totalDices) && !isNaN(diceValue)) {
            return {
                totalDices: totalDices,
                diceValue: diceValue,
                isValid: true
            };
        }
        return this.defaultRoll;
    };
    RollCommand.prototype.getAnswerForOneType = function (diceResults, dice) {
        if (diceResults.length !== 0) {
            var rollHeader = discord_utils_1.line(discord_utils_1.bold(discord_utils_1.underline("Roll " + diceResults.length + "d" + dice.value + " :")));
            var rollBody = "";
            var sum_1 = 0;
            var bonuses = [];
            for (var _i = 0, diceResults_1 = diceResults; _i < diceResults_1.length; _i++) {
                var diceResult = diceResults_1[_i];
                rollBody += discord_utils_1.indent(diceResult.result + " ");
                if (diceResult.hasBonus) {
                    rollBody += discord_utils_1.it("" + diceResult.getBonus);
                }
                rollBody = discord_utils_1.line(rollBody);
                sum_1 += diceResult.result;
                bonuses.push(diceResult.getBonus);
                diceResult.getBonus.forEach(function (bonus) { return sum_1 = bonus.applyBonus(sum_1); });
            }
            this.totalSum += sum_1;
            var sumFooter = discord_utils_1.line(discord_utils_1.indent(discord_utils_1.underline("Total d" + dice.value + " :") + (" " + sum_1)));
            return rollHeader + rollBody + sumFooter;
        }
        return '';
    };
    RollCommand.prototype.getAnswer = function (results) {
        var _this = this;
        var groupedResult = new Map();
        results.forEach(function (result) {
            var _a;
            var diceValue = result.dice.value;
            if (!groupedResult.has(diceValue)) {
                groupedResult.set(diceValue, [result]);
            }
            else {
                (_a = groupedResult.get(diceValue)) === null || _a === void 0 ? void 0 : _a.push(result);
            }
        });
        var answer = '';
        groupedResult.forEach(function (diceResults, dice) {
            answer += discord_utils_1.line(_this.getAnswerForOneType(diceResults, new dice_utils_1.Dice(dice)));
        });
        var totalSumFooter = discord_utils_1.emptyLine() + discord_utils_1.line(discord_utils_1.underline("Total all dices :") + (" " + this.totalSum));
        return answer + totalSumFooter;
    };
    RollCommand.prototype.run = function (parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function () {
            var args, results_1, lastDiceResults_1, answer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.totalSum = 0;
                        args = parsedUserCommand.args;
                        if (!(args.length >= 1)) return [3 /*break*/, 2];
                        results_1 = [];
                        lastDiceResults_1 = dice_utils_1.DiceResult.DEFAULT_DICE_RESULT;
                        args.forEach(function (arg) {
                            for (var i in dice_utils_1.Bonus.bonusTypes) {
                                var bonusType = dice_utils_1.Bonus.bonusTypes[i];
                                if (arg.startsWith(bonusType) && lastDiceResults_1 !== dice_utils_1.DiceResult.DEFAULT_DICE_RESULT) {
                                    var bonusValue = parseInt(arg.replace(bonusType, ''));
                                    if (!isNaN(bonusValue)) {
                                        lastDiceResults_1.addBonus(new dice_utils_1.Bonus(bonusType, bonusValue));
                                    }
                                    break;
                                }
                            }
                            var roll = _this.parseArg(arg);
                            if (roll.isValid) {
                                var dicesResults = _this.rollOneType(roll.totalDices, roll.diceValue);
                                lastDiceResults_1 = dicesResults[dicesResults.length - 1];
                                dicesResults.forEach(function (result) {
                                    results_1.push(result);
                                });
                            }
                        });
                        server_utils_1.logRoll(results_1, parsedUserCommand.originalMessage.author);
                        answer = discord_utils_1.mentionUser(parsedUserCommand) + discord_utils_1.emptyLine() + this.getAnswer(results_1);
                        return [4 /*yield*/, parsedUserCommand.originalMessage.channel.send(answer)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RollCommand.prototype.hasPermissionToRun = function (parsedUserCommand) {
        return true;
    };
    return RollCommand;
}());
exports.RollCommand = RollCommand;
//# sourceMappingURL=roll.js.map