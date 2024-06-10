import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts';
import { HintProps } from '../../interfaces/index.ts';
import { Hints } from '../../constants/index.ts';

const Hint: React.FC<HintProps> = ({id}) => {
    const hintFieldCross = useSelector((state: RootState) => state.game.hint.field_x);
    const hintFieldZero = useSelector((state: RootState) => state.game.hint.field_0);
    const hintValue: string = ( id === 'x' ? hintFieldCross : hintFieldZero );

    return (
      <>
        <p id={id} style={{ color: hintValue === Hints.YouLost ? 'red' : hintValue === Hints.YouWin ? 'green' : '#cdff04' }}>
          { hintValue }
        </p>
      </>
    )
}

export default Hint
