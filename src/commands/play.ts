import {
  AudioPlayerStatus,
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { VoiceChannel } from 'discord.js';
import { MusicManager } from '../managers/music-manager';
import { CommandContext } from '../models/command_context';
import { createDiscordJSAdapter } from '../utils/adapter';
import { Command } from './command';

export class PlayCommand implements Command {
  commandNames = ['play'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  private parseArg(args: string[]): string {
    if (args.length > 0) {
      return args[0];
    }
    return '';
  }

  //TODO ytpl et ytsr installed maybe for nothing
  async run(parsedUserCommand: CommandContext): Promise<void> {
    const voiceChannel =
      parsedUserCommand.originalMessage.member?.voice.channel;
    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      const song: string = this.parseArg(parsedUserCommand.args);
      if (song !== '') {
        MusicManager.addQueue(song);
        try {
          if (
            MusicManager.getPlayer().state.status !== AudioPlayerStatus.Playing
          ) {
            const connection = await this.connectToChannel(voiceChannel);
            connection.subscribe(MusicManager.getPlayer());
            MusicManager.play();
            await parsedUserCommand.originalMessage.reply('Playing now !');
          }
        } catch (error) {
          await parsedUserCommand.originalMessage.reply(
            "Couldn't play this song :(",
          );
        }
      } else {
        await parsedUserCommand.originalMessage.reply(
          'No link given. Please enter a valid link after the "play" command',
        );
      }
    } else {
      await parsedUserCommand.originalMessage.reply(
        'Please connect to an audio channel first.',
      );
    }
  }

  // TODO create an utils for those functions
  async connectToChannel(channel: VoiceChannel) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: createDiscordJSAdapter(channel),
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
      return connection;
    } catch (error) {
      connection.destroy();
      throw error;
    }
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
