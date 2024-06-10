import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../../store/GameSlice.ts';
import { AppDispatch } from '../../store/index.ts';

const ResetBtn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const renewGame = () => dispatch(resetGame('reset'));

    return (
        <>
          <button type="reset" onClick={renewGame}>Reset</button>
        </>
    )
};

export default ResetBtn;
