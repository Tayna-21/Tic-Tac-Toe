import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialGameState from '../utilities/index.ts';
import { moveOrder, arrayOfIndexes, Hints } from '../constants/index.ts';
import { GameState } from '../interfaces/index.ts';

const initialState: GameState = initialGameState as GameState;
let isCellId: boolean;

const getNextMove = (currentSymbol: string) : string => {
    const nextSymbolId = moveOrder.indexOf(currentSymbol) + 1;

    return moveOrder[nextSymbolId] ?? moveOrder[0];
}

const isWinner = (array: (string | null)[]) => {
    const winIndexes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const strikePosition: string[] = [
        'horizon-up',
        'horizon-middle',
        'horizon-down',
        'vertical-left',
        'vertical-middle',
        'vertical-right',
        'diagonal-left',
        'diagonal-right'
    ];
    const winCombination = [];

    for (let i = 0; i < winIndexes.length; i++) {
        const [a, b, c] = winIndexes[i];

        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            winCombination.push(array[a], strikePosition[i])

            return winCombination;
        };
    };

    return null;
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateGameState(state: GameState = initialState, action: PayloadAction<string>) {
            const cellId = parseInt(action.payload, 10);
            isCellId = arrayOfIndexes.includes(cellId);

            if (isCellId) {
                return;
            } else if (!isCellId) {
                arrayOfIndexes.push(cellId);

                const updatedCells = state.cells.map((cell, i) => {

                                   return (i === cellId ? state.currentMove : cell);
                                });

                const updatedCurrentMove = getNextMove(state.currentMove);
                const updatedWinner = isWinner(updatedCells);

                return {
                    ...state,
                    cells: updatedCells,
                    currentMove: updatedCurrentMove,
                    winner: {
                        symbol: ( updatedWinner ? updatedWinner[0] : null ),
                        strike: ( updatedWinner ? updatedWinner[1] : null )
                    },
                };
            };
        },

        changeFieldClickability(state: GameState, action: PayloadAction<string>) {
            const itemId = action.payload;
            const fieldId = itemId.slice(itemId.indexOf('-') + 1);

            if (isCellId) {
                return state;
            } else if (!isCellId && !state.winner.symbol) {
                if (arrayOfIndexes.length === 9) {
                    return {
                        ...state,
                        hint: {
                            ...state,
                            field_x: Hints.Draw,
                            field_0: Hints.Draw,
                        }
                    }
                };

                return {
                    ...state,
                    hint: {
                        ...state,
                        field_x: ( fieldId === 'x' ? Hints.WaitYourOpponent : Hints.YourTurn ),
                        field_0: ( fieldId === '0' ? Hints.WaitYourOpponent : Hints.YourTurn ),
                    },
                    disabled: {
                        ...state,
                        field_x: ( fieldId === 'x' ? 'disabled' : 'enabled' ),
                        field_0: ( fieldId === '0' ? 'disabled' : 'enabled' ),
                    }
                };
            } else if (state.winner.symbol) {
                return {
                    ...state,
                    winCount: {
                        ...state,
                        field_x: ( state.winner.symbol === 'cross' ? state.winCount.field_x + 1 : state.winCount.field_x ),
                        field_0: ( state.winner.symbol === 'zero' ? state.winCount.field_0 + 1 : state.winCount.field_0 )
                    },
                    hint: {
                        ...state,
                        field_x: ( state.winner.symbol === 'cross' ? Hints.YouWin : Hints.YouLost ),
                        field_0: ( state.winner.symbol === 'zero' ? Hints.YouWin : Hints.YouLost ),
                    },
                    disabled: {
                        ...state,
                        field_x: 'disabled',
                        field_0: 'disabled',
                    }
                };
            };
        },

        restartGame(state: GameState = initialState, action: PayloadAction<'restart'>) {
            if (action.payload) {
                arrayOfIndexes.length = 0;

                return {
                    ...state,
                    cells: initialState.cells,
                    currentMove: initialState.currentMove,
                    winner: initialState.winner,
                    hint: initialState.hint,
                    disabled: initialState.disabled
                };
            } else {
                return;
            };
        },

        addCurrentMessage(state: GameState = initialState, action: PayloadAction<{value: string, id: string}>) {
            const updatedCurrentMessage = action.payload.value;
            const updatedCurrentMessageId = action.payload.id;

            return {
                ...state,
                currentMessage: {
                    ...state,
                    field_1: ( updatedCurrentMessageId === '1' ? updatedCurrentMessage : '' ),
                    field_2: ( updatedCurrentMessageId === '2' ? updatedCurrentMessage : '' )
                }
            }
        },

        addMessages(state: GameState = initialState, action: PayloadAction<{value: string, id: string}>) {
            const updatedMessage = action.payload;

            if (updatedMessage.value === '') {
                return state;
            } else {
                return {
                    ...state,
                    messages: [...state.messages, updatedMessage]
                };
            };
        },

        resetGame(_state: GameState, action: PayloadAction<'reset'>) {            
            if (action.payload) {
                arrayOfIndexes.length = 0;

                return initialState;
            };
        }
    }
});

export const { updateGameState, changeFieldClickability, restartGame, addCurrentMessage, addMessages, resetGame } = gameSlice.actions;
export default gameSlice.reducer
