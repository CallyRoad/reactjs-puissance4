// class Game {
//   constructor(grid) {
//     this.grid = grid;
//     this.lines = grid.length;
//     this.columns = grid[0].length;
//     //this.round = 1;
//     //Le joueur 1 commence
//     this.currentPlayer = 1;
//   }
//   placeSpawn(column) {
//     for (let line = this.lines - 1; line >= 0; line--) {
//       if (this.grid[line][column] === 0) {
//         this.grid[line][column] = this.currentPlayer;
//        // this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
//         return true;
//       }
//     }
//     console.log("Cette colonne est déjà remplie");
//     return false;

//   }

//   changePlayer() {
//     this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
//     return this.currentPlayer;
//   }
// }

// export default Game;
////////////////////////////

export function createGame(grid) {
  return {
    grid,
    lines: grid.length,
    columns: grid[0].length,

    placePawn(column, player) {
      for (let line = this.lines - 1; line >= 0; line--) {
        if (this.grid[line][column] === 0) {
          this.grid[line][column] = player;
          return true;
        }
      }
      return false;
    },
  };
}
