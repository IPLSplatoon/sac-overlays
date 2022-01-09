import { ActiveRound } from 'schemas';
import { addDots } from './string';

export type ChangedGame = { index: number, stage: string, mode: string };
export type UpdatedGames = { isNewRound: boolean, isFirstLoad: boolean, changedGames: Array<ChangedGame> };

export function getUpdatedGames(newValue: ActiveRound, oldValue: ActiveRound): UpdatedGames {
    const gamesWithIndex = newValue.games.map((game, index) => ({
        index,
        ...game
    }));

    if (!oldValue || newValue.round.id !== oldValue.round.id) {
        return {
            isNewRound: true,
            isFirstLoad: !oldValue,
            changedGames: gamesWithIndex
        };
    }

    return {
        isNewRound: false,
        isFirstLoad: false,
        changedGames: gamesWithIndex.filter((game, index) => {
            const oldGame = oldValue.games[index];
            return game.stage !== oldGame.stage || game.mode !== oldGame.mode;
        })
    };
}

export type GameWinner = 'none' | 'alpha' | 'bravo'
export type UpdatedWinner = { index: number, winner: GameWinner, oldWinner: GameWinner };

export function getUpdatedWinners(newValue: ActiveRound, oldValue: ActiveRound): Array<UpdatedWinner> {
    const winners = newValue.games.map((game, index) => ({
        index,
        winner: game.winner,
        oldWinner: oldValue?.games[index]?.winner
    }));

    if (!oldValue || newValue.round.id !== oldValue.round.id) {
        return winners;
    }

    return winners.filter(winner => {
        const oldGame = oldValue.games[winner.index];
        return winner.winner !== oldGame.winner
            || (winner.winner === 'alpha' && newValue.teamA.name !== oldValue.teamA.name)
            || (winner.winner === 'bravo' && newValue.teamB.name !== oldValue.teamB.name);
    });
}

export function getWinnerName(activeRound: ActiveRound, winner: GameWinner): string {
    return addDots(winner === 'alpha' ? activeRound.teamA.name : activeRound.teamB.name);
}
