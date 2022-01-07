import { DateTime } from 'luxon';

let nextStageDate: DateTime;
let lastNextStageDiff: number;
let nextStageDiffInterval: number;

export function setNextStageTimer(time: string, diffChangeCallback: (newValue: number) => unknown): void {
    function checkDiff() {
        const diff = Math.ceil(nextStageDate.diffNow(['minutes']).toObject().minutes);
        if (lastNextStageDiff !== diff) {
            lastNextStageDiff = diff;
            diffChangeCallback(diff);
        }
    }

    const newDate = DateTime.fromISO(time);

    if (newDate.toMillis() !== nextStageDate?.toMillis()) {
        nextStageDate = newDate;
        clearInterval(nextStageDiffInterval);

        checkDiff();
        nextStageDiffInterval = window.setInterval(checkDiff, 1000);
    }
}
