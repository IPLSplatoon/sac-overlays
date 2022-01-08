import { activeRound } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { doOnDifference } from '../../helpers/object';
import { OPACITY_ANIMATION_DURATION, textOpacitySwap } from '../../helpers/anim';
import { addDots } from '../../helpers/string';
import gsap from 'gsap';

const teamANameElem = elementById<FittedText>('scene-teams__team-a-name');
const teamAPlayersElem = elementById('scene-teams__team-a-players');
const teamBNameElem = elementById<FittedText>('scene-teams__team-b-name');
const teamBPlayersElem = elementById('scene-teams__team-b-players');

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(addDots(name), teamANameElem);
    });
    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(addDots(name), teamBNameElem);
    });

    doOnDifference(newValue, oldValue, 'teamA.players', () => {
        setPlayers(newValue.teamA.players, 'a');
    });
    doOnDifference(newValue, oldValue, 'teamB.players', () => {
        setPlayers(newValue.teamB.players, 'b');
    });
});

function setPlayers(players: Array<{ name: string }>, team: 'a' | 'b'): void {
    const tl = gsap.timeline();
    const align = team === 'a' ? 'left' : 'right';
    const playersElem = team === 'a' ? teamAPlayersElem : teamBPlayersElem;

    tl
        .to(playersElem, {
            opacity: 0,
            duration: OPACITY_ANIMATION_DURATION,
            onComplete: () => {
                playersElem.innerHTML = players.reduce((existing, player, index) => {
                    if (index >= 6) {
                        return existing;
                    }

                    existing += `<fitted-text text="${addDots(player.name)}" max-width="530" align="${align}"></fitted-text>`;
                    return existing;
                }, '');
            }
        })
        .to(playersElem, {
            opacity: 1,
            duration: OPACITY_ANIMATION_DURATION
        });
}
