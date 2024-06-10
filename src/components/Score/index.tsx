import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts'

const Score: React.FC = () => {
    const winCount = useSelector((state: RootState) => state.game.winCount);

    return (
        <>
          <p>Score {winCount.field_x} : {winCount.field_0}</p>
        </>
    )
}

export default Score;
