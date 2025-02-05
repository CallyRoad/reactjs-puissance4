// React core
import React from 'react';

// Style
import mgame from '../../../game.module.scss';

// Component Pawn
import Pawn from '../../../Pawn';

/* Renders the game board grid with interactive pawns */
const GameGrid = ({game, onMovePlayed, winningLine}) => (
    <>
        {game.grid.map((line, lineIndex) => (
            <div key={lineIndex} className={mgame.line}>

                {line.map((box, columnIndex) => (
                    <Pawn
                        key={columnIndex}
                        value={box}
                        onClick={() => onMovePlayed(lineIndex, columnIndex)}
                        lineIndex={lineIndex}
                        columnIndex={columnIndex}
                        winningLine={winningLine}
                    />
                ))}
            </div>
        ))}
    </>
);

export default GameGrid;