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
