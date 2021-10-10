import { AudioPlayerStatus } from '@discordjs/voice';
import { VoiceChannel } from 'discord.js';
import { MusicManager } from '../../managers/music-manager';
import { CommandContext } from '../../models/command_context';
import { Command } from '../command';

export class PauseCommand implements Command {
  commandNames = ['pause', 'stop'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  //TODO ytpl et ytsr installed maybe for nothing
  async run(parsedUserCommand: CommandContext): Promise<void> {
    const voiceChannel =
      parsedUserCommand.originalMessage.member?.voice.channel;
    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      try {
        if (
          MusicManager.getPlayer().state.status !== AudioPlayerStatus.Playing
        ) {
          await parsedUserCommand.originalMessage.reply(
            "I'm not playing music",
          );
        } else {
          MusicManager.getPlayer().pause();
        }
      } catch (error) {
        await parsedUserCommand.originalMessage.reply('Something bad happened');
      }
    } else {
      await parsedUserCommand.originalMessage.reply(
        'Please connect to an audio channel first.',
      );
    }
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
