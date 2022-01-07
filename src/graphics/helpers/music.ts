import { NowPlaying } from 'schemas';
import { isEmpty } from 'lodash';

export function getSongName(nowPlaying: NowPlaying): string {
    return [nowPlaying.song, nowPlaying.artist]
        .filter(value => !!value && !isEmpty(value))
        .join(' - ');
}
