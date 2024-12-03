export function victoryChecker(grid) {
  return {
    grid, 
    lines : grid.length,
    columns : grid[0].length,

    verifyVictory(currentPlayer) {
      for (let line = 0; line < this.lines; line++) {
        for (let column = 0; column < this.columns - 3; column++) {

          let victory = true;

          for (let i = 0; i < 4; i++) {
            if (this.grid[line][column + i] !== currentPlayer) {
              victory = false;
              break;
            }
          }

          if (victory) {
            return true;
          }
        }
      }
  
      //Check columns
      for (let column = 0; column < this.columns; column++) {
        for (let line = 0; line < this.lines - 3; line++) {
          let victory = true;
  
          for (let i = 0; i < 4; i++) {
            if (this.grid[line + i][column] !== currentPlayer) {
              victory = false;
              break;
            }
          }
          if (victory) {
            return true;
            
          }
        }
      }
  
      //Check diagonales
      for (let line = 0; line < this.lines - 3; line++) {
        for (let column = 0; column < this.columns - 3; column++) {
          let victory = true;
  
          for (let i = 0; i < 4; i++) {
            if (this.grid[line + i][column + i] !== currentPlayer) {
              victory = false;
              break;
            }
          }
          if (victory) {
            return true;
          }
        }
      }
  
      for (let line = 3; line < this.lines; line++) {
        for (let column = 0; column < this.columns - 3; column++) {
          let victory = true;
  
          for (let i = 0; i < 4; i++) {
            if (this.grid[line - i][column + i] !== currentPlayer) {
              victory = false;
              break;
            }
          }
          if (victory) {
            return true;
          }
        }
      }
    },

    verifyDraw() {
      for (let line = 0; line < this.lines; line++) {
        for (let column = 0; column < this.columns; column++) {
          if (this.grid[line][column] === 0) {
            return false;
          }
        }
      }
      return true;
    },

    getWinningLine(currentPlayer) {
      // Horizontal check
      for (let line = 0; line < this.lines; line++) {
        for (let column = 0; column < this.columns - 3; column++) {
          if (
              this.grid[line][column] === currentPlayer &&
              this.grid[line][column + 1] === currentPlayer &&
              this.grid[line][column + 2] === currentPlayer &&
              this.grid[line][column + 3] === currentPlayer
          ) {
            return [
              [line, column],
              [line, column + 1],
              [line, column + 2],
              [line, column + 3]
            ];
          }
        }
      }

      // Vertical check
      for (let column = 0; column < this.columns; column++) {
        for (let line = 0; line < this.lines - 3; line++) {
          if (
              this.grid[line][column] === currentPlayer &&
              this.grid[line + 1][column] === currentPlayer &&
              this.grid[line + 2][column] === currentPlayer &&
              this.grid[line + 3][column] === currentPlayer
          ) {
            return [
              [line, column],
              [line + 1, column],
              [line + 2, column],
              [line + 3, column]
            ];
          }
        }
      }

      // Diagonal check (top-left to bottom-right)
      for (let line = 0; line < this.lines - 3; line++) {
        for (let column = 0; column < this.columns - 3; column++) {
          if (
              this.grid[line][column] === currentPlayer &&
              this.grid[line + 1][column + 1] === currentPlayer &&
              this.grid[line + 2][column + 2] === currentPlayer &&
              this.grid[line + 3][column + 3] === currentPlayer
          ) {
            return [
              [line, column],
              [line + 1, column + 1],
              [line + 2, column + 2],
              [line + 3, column + 3]
            ];
          }
        }
      }

      // Diagonal check (top-right to bottom-left)
      for (let line = 0; line < this.lines - 3; line++) {
        for (let column = 3; column < this.columns; column++) {
          if (
              this.grid[line][column] === currentPlayer &&
              this.grid[line + 1][column - 1] === currentPlayer &&
              this.grid[line + 2][column - 2] === currentPlayer &&
              this.grid[line + 3][column - 3] === currentPlayer
          ) {
            return [
              [line, column],
              [line + 1, column - 1],
              [line + 2, column - 2],
              [line + 3, column - 3]
            ];
          }
        }
      }

      return [];
    }
  };
}