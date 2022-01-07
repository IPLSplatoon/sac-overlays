import { nowPlaying, musicShown } from '../../helpers/replicants';
import { toggleMainRow } from './mainScene';
import { textOpacitySwap } from '../../helpers/anim';
import { getSongName } from '../../helpers/music';
import { elementById } from '../../helpers/elem';

nowPlaying.on('change', newValue => {
    textOpacitySwap(getSongName(newValue), elementById('main-scene-music'));
});

musicShown.on('change', newValue => {
    toggleMainRow(newValue, 'info-row-music');
});
