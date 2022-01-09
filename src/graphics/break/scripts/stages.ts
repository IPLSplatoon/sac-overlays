import { activeBreakScene, activeRound } from '../../helpers/replicants';
import {
    getUpdatedGames,
    getUpdatedWinners,
    getWinnerName,
    UpdatedGames,
    UpdatedWinner
} from '../../helpers/stage';
import gsap from 'gsap';
import { mapNameToImagePath } from '../../helpers/constants';
import { loadImage } from '../../helpers/image';
import { elementById } from '../../helpers/elem';
import { textOpacitySwap } from '../../helpers/anim';
import { sceneSwitchTl } from './sceneSwitcher';

const stagesLayout = elementById('stages-layout');

activeRound.on('change', (newValue, oldValue) => {
    const games = getUpdatedGames(newValue, oldValue);
    const winners = getUpdatedWinners(newValue, oldValue);

    updateGames(games, winners);

    if (!games.isNewRound) {
        setWinners(winners);
    }
});

function getStageUrl(stageName: string): string {
    return `assets/stages/${mapNameToImagePath[stageName]}`;
}

async function updateGames(games: UpdatedGames, winners: Array<UpdatedWinner>): Promise<void> {
    const stageElementIds = games.changedGames.map(game => `#stage_${game.index}`).join(', ');
    const target = games.isNewRound ? '#stages-layout > .stage' : stageElementIds;
    const tl = gsap.timeline({
        defaults: {
            force3D: false,
            immediateRender: false
        }
    });

    function createStageElems() {
        if (games.isNewRound) {
            const modeTextMaxWidth = { '3': 380, '5': 258, '7': 217 }[games.changedGames.length];
            stagesLayout.classList.remove('stage-count-3', 'stage-count-5', 'stage-count-7');
            stagesLayout.classList.add(`stage-count-${games.changedGames.length}`);
            stagesLayout.innerHTML = games.changedGames.reduce((prev, game) => {
                prev += `
                    <div class="stage layout vertical" id="stage_${game.index}" style="opacity: 0">
                        <div class="stage-winner" id="winner_${game.index}">
                            <div class="stage-winner-text"></div>
                        </div>
                        <div class="stage-image" style="background-image: url('${getStageUrl(game.stage)}')"></div>
                        <div class="stage-mode layout horiz c-horiz">
                            <fitted-text class="stage-mode-text" text="${game.mode}" align="center" max-width="${modeTextMaxWidth}"></fitted-text>
                        </div>    
                        <div class="stage-name layout horiz c-horiz c-vert">
                            <div class="stage-name-text">${game.stage}</div>
                        </div>
                    </div>                
                `;

                return prev;
            }, '');
            setWinners(winners);
        } else {
            games.changedGames.forEach(game => {
                const stageElem = elementById(`stage_${game.index}`);

                stageElem.querySelector<HTMLDivElement>('.stage-image').style.backgroundImage = `url('${getStageUrl(game.stage)}')`;
                stageElem.querySelector<FittedText>('.stage-mode-text').text = game.mode;
                stageElem.querySelector<HTMLDivElement>('.stage-name-text').innerText = game.stage;
            });
        }

        if (activeBreakScene.value === 'stages') {
            tl.fromTo(target, {
                y: -50
            }, {
                duration: 0.5,
                ease: 'power2.out',
                y: 0,
                opacity: 1,
                stagger: 0.1
            });
        }
    }

    await Promise.all(games.changedGames.map(game => loadImage(getStageUrl(game.stage))));

    if (!games.isFirstLoad && activeBreakScene.value === 'stages') {
        tl.to(target, {
            duration: 0.5,
            ease: 'power2.in',
            y: 50,
            opacity: 0,
            stagger: 0.1,
            onComplete: createStageElems
        });
    } else {
        createStageElems();
    }

    sceneSwitchTl.add(tl);
}

function setWinners(winners: Array<UpdatedWinner>): void {
    winners.forEach(winner => {
        const winnerElem = elementById(`winner_${winner.index}`);
        const winnerText = winnerElem.querySelector<HTMLDivElement>('.stage-winner-text');

        if (winner.winner !== 'none') {
            const winnerName = getWinnerName(activeRound.value, winner.winner);

            if (winner.winner === 'alpha' && winner.oldWinner === 'bravo'
                || winner.winner === 'bravo' && winner.oldWinner === 'alpha'
                || winner.winner === winner.oldWinner) {
                textOpacitySwap(winnerName, winnerText);
            } else {
                winnerText.innerText = winnerName;
            }
        }

        gsap.to(winnerElem, { duration: 0.35, opacity: winner.winner === 'none' ? 0 : 1 });
    });
}
