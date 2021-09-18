"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var ts_mockito_1 = require("ts-mockito");
var command_handler_1 = require("../src/command_handler");
var buildMessage = function (content) {
    var message = ts_mockito_1.mock(discord_js_1.Message);
    message.content = content;
    return message;
};
describe('CommandHandler', function () {
    var commandHandler = new command_handler_1.CommandHandler('!');
    it('should execute a command in a message', function () {
        var message = buildMessage('!dale');
    });
});
//# sourceMappingURL=command_handler.test.js.map