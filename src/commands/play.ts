import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel,
  StreamType,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { VoiceChannel } from 'discord.js';
import ytdl from 'ytdl-core';
import { CommandContext } from '../models/command_context';
import { createDiscordJSAdapter } from '../utils/adapter';
import { Command } from './command';

export class PlayCommand implements Command {
  commandNames = ['play'];

  private player: AudioPlayer;

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
    this.player = createAudioPlayer();

    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      const song: string = this.parseArg(parsedUserCommand.args);
      if (song !== '') {
        try {
          await this.playSong(song);
          console.log('Song is ready to play!');
          const connection = await this.connectToChannel(voiceChannel);
          console.log('connection done');
          connection.subscribe(this.player);
          await parsedUserCommand.originalMessage.reply('Playing now !');
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

  async playSong(song: string) {
    const resource = createAudioResource(ytdl(song), {
      inputType: StreamType.Arbitrary,
    });

    this.player.play(resource);

    return entersState(this.player, AudioPlayerStatus.Playing, 5e3);
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
