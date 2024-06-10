import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restartGame } from './store/GameSlice.ts';
import Player from './components/Player/index.tsx';
import Score from './components/Score/index.tsx';
import ResetBtn from './components/ResetBtn/index.tsx';
import { RootState, AppDispatch } from './store/index.ts';

const App: React.FC = () => {
    const cells = useSelector((state: RootState) => state.game.cells);
    const winner = useSelector((state: RootState) => state.game.winner.symbol);
    const dispatch = useDispatch<AppDispatch>();
    const clearGameField  = () => dispatch(restartGame('restart'));

    useEffect(() => {
        if (winner || !cells.includes(null)) {
              setTimeout(clearGameField, 5000)
        }
    }, [winner, cells])

    return (
      <div className="wrapper">
        <header className="app-header">
          <div className="heading">
            <h1>Player 1</h1>
          </div>
          <div className="heading">
            <h1>Player 2</h1>
          </div>
          <div className="score">
            <Score />
            <ResetBtn />
          </div>
        </header>
        <main className="app-body">
          <Player id="1" symbol="x" />
          <Player id="2" symbol="0" />
        </main>
      </div>
    )
}

export default App
