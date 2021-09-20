import { Guild, GuildMember, StageChannel, VoiceChannel } from 'discord.js';
import { getClient } from '../server';
import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, StreamType, VoiceConnectionStatus } from '@discordjs/voice';

import ytdl from 'ytdl-core';
import { createDiscordJSAdapter } from '../utils/adapter';

export class GreetCommand implements Command {
  commandNames = ['greet', 'hello', 'test'];

  private player: AudioPlayer;

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  //TODO ytpl et ytsr installed maybe for nothing

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const voiceChannel = parsedUserCommand.originalMessage.member?.voice.channel;

    this.player = createAudioPlayer();

    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      try {

        await this.playSong();
        console.log('Song is ready to play!');
				const connection = await this.connectToChannel(voiceChannel);
        console.log('connection done');
				connection.subscribe(this.player);
        await parsedUserCommand.originalMessage.reply('Playing now!');

			} catch (error) {
				console.error(error);
			}
      
    }
    
    await parsedUserCommand.originalMessage.reply('hello, world!');
  }

  async playSong() {
    // const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
    //   inputType: StreamType.Arbitrary,
    // });
    const resource2 = createAudioResource(ytdl('https://www.youtube.com/watch?v=oJ2dhK_oVi0'), {
      inputType: StreamType.Arbitrary,
    });


  
    this.player.play(resource2);
  
    return entersState(this.player, AudioPlayerStatus.Playing, 5e3);
  }

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


