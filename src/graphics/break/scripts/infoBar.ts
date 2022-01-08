import { activeRound } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';

const teamANameElem = elementById<FittedText>('info-bar-scoreboard__team-a-name');
const teamBNameElem = elementById<FittedText>('info-bar-scoreboard__team-b-name');
const teamAScoreElem = elementById('info-bar-scoreboard__team-a-score');
const teamBScoreElem = elementById('info-bar-scoreboard__team-b-score');

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(name, teamANameElem);
    });
    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(name, teamBNameElem);
    });

    teamAScoreElem.innerText = newValue.teamA.score.toString();
    teamBScoreElem.innerText = newValue.teamB.score.toString();
});
