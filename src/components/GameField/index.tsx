import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameState, changeFieldClickability } from '../../store/GameSlice.ts';
import GameFieldCell from '../GameFieldCell/index.tsx';
import { RootState, AppDispatch } from '../../store/index.ts';
import { GameFieldProps } from '../../interfaces/index.ts';

const GameField: React.FC<GameFieldProps> = ({symbol}) => {
    const gameField = useSelector((state: RootState) => state.game.cells);
    const disabledFieldCross = useSelector((state: RootState) => state.game.disabled.field_x);
    const disabledFieldZero = useSelector((state: RootState) => state.game.disabled.field_0);
    const strikePosition = useSelector((state: RootState) => state.game.winner.strike)
    const dispatch = useDispatch<AppDispatch>();

    const takeGameStep = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(updateGameState(event.currentTarget.id));
        dispatch(changeFieldClickability(event.currentTarget.id))
    };

    return (
        <div className="game-field" data-disabled={ symbol == 'x' ? disabledFieldCross : disabledFieldZero }>
          { gameField.map((cell: string | null, index: number) => (
              <GameFieldCell
                key={index}
                id={index + "-" + symbol}
                children={cell}
                onClick={takeGameStep}
              />
          )) }
          <div className={`strike ${strikePosition}`}></div>
        </div>
    )
}

export default GameField
