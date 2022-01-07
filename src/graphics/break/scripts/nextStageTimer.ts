import { nextRoundTime } from '../../helpers/replicants';
import { setNextStageTimer } from '../../helpers/timer';
import { doOnDifference } from '../../helpers/object';
import { toggleMainRow } from './mainScene';
import { elementById } from '../../helpers/elem';

const timerTextElem = elementById<FittedText>('main-scene-timer');

nextRoundTime.on('change', (newValue, oldValue) => {
    setNextStageTimer(newValue.startTime, diff => {
        if (diff < 1) {
            timerTextElem.text = 'Next round starts <span class="bold">soon!</span>';
        } else if (diff === 1) {
            timerTextElem.text = `Next round starts in <span class="bold">${diff}</span> minute...`;
        } else {
            timerTextElem.text = `Next round starts in <span class="bold">${diff}</span> minutes...`;
        }
    });

    doOnDifference(newValue, oldValue, 'isVisible', (isVisible: boolean) => {
        toggleMainRow(isVisible, 'info-row-timer');
    });
});
