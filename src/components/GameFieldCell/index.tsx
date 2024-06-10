import React from 'react';
import CrossIcon from '../Icons/CrossIcon.tsx';
import ZeroIcon from '../Icons/ZeroIcon.tsx';
import { CellProps } from '../../interfaces/index.ts';

const GameFieldCell: React.FC<CellProps> = ({children, id, onClick}) => {
    return (
        <div className="game-field-cell" role="button" id={id} onClick={onClick}>
          {children === 'cross' && <CrossIcon />}
          {children === 'zero' && <ZeroIcon />}
        </div>
    )
}

export default GameFieldCell;
