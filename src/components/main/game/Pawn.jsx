// React core
import React from 'react';

// Style
import mgame from "./game.module.scss"

/* Individual pawn component representing a cell.
* Containing a yellow or red pawn
* Highlighted if part of winning line
**/
const Pawn = ({
                  value,
                  onClick,
                  winningLine,
                  lineIndex,
                  columnIndex
              }) => {

    const isWinningPawn = winningLine.some(([winLineIndex, winColumnIndex]) => winLineIndex === lineIndex && winColumnIndex === columnIndex);

    return (
        <div className={`${mgame.cell} ${isWinningPawn ? mgame.win : ""}`}
             onClick={() => onClick(lineIndex, columnIndex)}
        >
            {(value === 1) && <div className={`${mgame["yellow-pawn"]} ${mgame["animate-appear"]}`}></div>}
            {(value === 2) && <div className={`${mgame["red-pawn"]} ${mgame["animate-appear"]}`}></div>}
        </div>
    );
};

export default Pawn;