import { activeRound, scoreboardData } from '../../helpers/replicants';
import { elementById } from '../../helpers/elem';
import { doOnDifference } from '../../helpers/object';
import { textOpacitySwap } from '../../helpers/anim';
import gsap from 'gsap';
import { addDots } from '../../helpers/string';

const teamAScore = elementById('team-a-score');
const teamAName = elementById('team-a-name');
const teamAColor = elementById('team-a-color');
const teamBScore = elementById('team-b-score');
const teamBName = elementById('team-b-name');
const teamBColor = elementById('team-b-color');

const flavorTextElem = elementById('scoreboard-flavor-text');

activeRound.on('change', (newValue, oldValue) => {
    teamAScore.innerText = newValue.teamA.score.toString();
    teamBScore.innerText = newValue.teamB.score.toString();

    doOnDifference(newValue, oldValue, 'teamA.name', (name: string) => {
        textOpacitySwap(addDots(name), teamAName);
    });
    doOnDifference(newValue, oldValue, 'teamB.name', (name: string) => {
        textOpacitySwap(addDots(name), teamBName);
    });

    doOnDifference(newValue, oldValue, 'teamA.color', (color: string) => {
        gsap.to(teamAColor, { duration: 0.5, backgroundColor: color });
    });
    doOnDifference(newValue, oldValue, 'teamB.color', (color: string) => {
        gsap.to(teamBColor, { duration: 0.5, backgroundColor: color });
    });
});

scoreboardData.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'flavorText', (flavorText: string) => {
        textOpacitySwap(flavorText, flavorTextElem);
    });

    doOnDifference(newValue, oldValue, 'isVisible', (isVisible: boolean) => {
        const tl = gsap.timeline({
            defaults: {
                immediateRender: false,
                force3D: false
            }
        });

        if (isVisible) {
            tl
                .fromTo('.scoreboard-extra', { width: '29.8%', alignSelf: 'flex-end' }, { opacity: 1, duration: 0.35 })
                .to('.scoreboard-extra', {
                    width: '100%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '-=0.1')
                .to('.scoreboard-content', {
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }, '+=0.1');
        } else {
            tl
                .to('.scoreboard-content', {
                    y: 140,
                    duration: 0.5,
                    ease: 'power2.in'
                })
                .fromTo('.scoreboard-extra', {
                    alignSelf: 'flex-start'
                }, {
                    width: '29.8%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '+=0.1')
                .to('.scoreboard-extra', { opacity: 0, duration: 0.35 });
        }
    });
});
