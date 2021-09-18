"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentionUser = exports.emptyLine = exports.line = exports.indent = exports.underline = exports.bold = exports.it = void 0;
function it(text) {
    return '*' + text + '*';
}
exports.it = it;
function bold(text) {
    return '**' + text + '**';
}
exports.bold = bold;
function underline(text) {
    return '__' + text + '__ ';
}
exports.underline = underline;
function indent(text) {
    return '> ' + text;
}
exports.indent = indent;
function line(text) {
    return text + '\r\n';
}
exports.line = line;
function emptyLine() {
    return '\r\n';
}
exports.emptyLine = emptyLine;
function mentionUser(commandContext) {
    return "<@" + commandContext.originalMessage.author.id + ">";
}
exports.mentionUser = mentionUser;
//# sourceMappingURL=discord-utils.js.map