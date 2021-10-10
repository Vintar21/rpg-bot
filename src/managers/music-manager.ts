import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

export class MusicManager {
  private static player: AudioPlayer = createAudioPlayer().once(
    AudioPlayerStatus.Idle,
    (state) => {
      this.queue.shift();
      if (this.queue.length > 0) {
        try {
          MusicManager.play().finally(() => console.log('ended'));
        } catch (e) {
          console.log('Error', e);
        }
      }
    },
  );
  private static queue: string[] = [];

  static getPlayer(): AudioPlayer {
    return MusicManager.player;
  }

  static clearQueue(): void {
    MusicManager.player.stop(true);
    this.queue = [];
  }

  static addQueue(song: string) {
    MusicManager.queue.push(song);
  }

  static async play() {
    if (this.queue.length > 0) {
      const song: string = this.queue[0];
      const resource = createAudioResource(ytdl(song), {
        inputType: StreamType.Arbitrary,
      });

      MusicManager.player.play(resource);

      return entersState(
        MusicManager.getPlayer(),
        AudioPlayerStatus.Playing,
        5e3,
      );
    }
  }
}
