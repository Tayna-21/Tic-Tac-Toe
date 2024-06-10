import React from 'react';
import GameField from '../GameField/index.tsx';
import Hint from '../Hint/index.tsx';
import Chat from '../Chat/index.tsx';
import { PlayerProps } from '../../interfaces/index.ts';

const Player: React.FC<PlayerProps> = ({id, symbol}) => {
    return (
        <div className="player" id={id}>
          <div className="container">
            <div className="content">
              <Hint id={symbol} />
              <GameField symbol={symbol} />
              <Chat playerId={id} />
            </div>
          </div>
        </div>
    )
}

export default Player;
