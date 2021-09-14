import { CommandContext } from "../models/command_context";

export function it(text: string): string {
    return '*' + text + '*';
}

export function bold(text: string): string {
    return '**' + text + '**';
}

export function underline(text: string): string {
    return '__' + text + '__ ';
}

export function indent(text: string): string {
    return '> ' + text;
}

export function line(text: string): string {
    return text + '\r\n';
}

export function emptyLine(): string {
    return '\r\n';
}

export function mentionUser(commandContext: CommandContext): string {
    return `<@${commandContext.originalMessage.author.id}>`
}