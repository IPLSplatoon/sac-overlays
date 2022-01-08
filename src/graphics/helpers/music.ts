import { NowPlaying } from 'schemas';
import { isEmpty } from 'lodash';

export function getSongName(nowPlaying: NowPlaying): string {
    return [nowPlaying.artist, nowPlaying.song]
        .filter(value => !!value && !isEmpty(value))
        .join(' - ');
}
