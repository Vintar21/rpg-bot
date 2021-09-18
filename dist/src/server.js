"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
var discord_js_1 = require("discord.js");
var command_handler_1 = require("./command_handler");
var config_1 = require("./config/config");
/** Pre-startup validation of the bot config. */
function validateConfig(botConf) {
    if (!botConf.token) {
        throw new Error('You need to specify your Discord bot token!');
    }
}
function getClient() {
    return client;
}
exports.getClient = getClient;
validateConfig(config_1.config);
var commandHandler = new command_handler_1.CommandHandler(config_1.config.prefix);
var client = new discord_js_1.Client({ ws: { intents: discord_js_1.Intents.ALL } });
client.on('ready', function () {
    console.log('Bot has started');
});
client.on('message', function (message) {
    commandHandler.handleMessage(message);
});
client.on('error', function (e) {
    console.error('Discord client error!', e);
});
client.login(config_1.config.token);
//# sourceMappingURL=server.js.map