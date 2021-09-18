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
exports.HelpCommand = void 0;
var HelpCommand = /** @class */ (function () {
    function HelpCommand(commands) {
        this.commandNames = ['help', 'halp', 'hlep'];
        this.commands = commands;
    }
    HelpCommand.prototype.run = function (commandContext) {
        return __awaiter(this, void 0, void 0, function () {
            var allowedCommands, commandNames, matchedCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allowedCommands = this.commands.filter(function (command) {
                            return command.hasPermissionToRun(commandContext);
                        });
                        if (!(commandContext.args.length === 0)) return [3 /*break*/, 2];
                        commandNames = allowedCommands.map(function (command) { return command.commandNames[0]; });
                        return [4 /*yield*/, commandContext.originalMessage.reply("here is a list of commands you can run: " + commandNames.join(', ') + ". Try !help " + commandNames[0] + " to learn more about one of them." +
                                '\nVersion: 0.4 https://github.com/hopskipnfall/discord-typescript-bot')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        matchedCommand = this.commands.find(function (command) {
                            return command.commandNames.includes(commandContext.args[0]);
                        });
                        if (!!matchedCommand) return [3 /*break*/, 4];
                        return [4 /*yield*/, commandContext.originalMessage.reply("I don't know about that command :(. Try !help to find all commands you can use.")];
                    case 3:
                        _a.sent();
                        throw Error('Unrecognized command');
                    case 4:
                        if (!allowedCommands.includes(matchedCommand)) return [3 /*break*/, 6];
                        return [4 /*yield*/, commandContext.originalMessage.reply(this.buildHelpMessageForCommand(matchedCommand, commandContext))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HelpCommand.prototype.buildHelpMessageForCommand = function (command, context) {
        return command.getHelpMessage(context.commandPrefix) + "\nCommand aliases: " + command.commandNames.join(', ');
    };
    HelpCommand.prototype.hasPermissionToRun = function (commandContext) {
        return true;
    };
    HelpCommand.prototype.getHelpMessage = function (commandPrefix) {
        return 'I think you already know how to use this command...';
    };
    return HelpCommand;
}());
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.js.map