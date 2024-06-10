import { moveOrder, Hints } from '../constants/index.ts';
import { GameState } from '../interfaces/index.ts'

const initialGameState: GameState = {
    cells: new Array(9).fill(null),
    currentMove: moveOrder[0],
    winner: {
        symbol: null,
        strike: null
    },
    winCount: {
        field_x: 0,
        field_0: 0
    },
    hint: {
        field_x: `${Hints.GameStarted + Hints.YourTurn}`,
        field_0: `${Hints.GameStarted + Hints.WaitYourOpponent}`
    },
    disabled: {
        field_x: "enabled",
        field_0: "disabled",
    },
    messages: [],
    currentMessage: {
        field_1: '',
        field_2: ''
    }
};
export default initialGameState;
