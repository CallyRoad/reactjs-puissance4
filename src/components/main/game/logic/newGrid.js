export const createGrid = (lines, columns) => {
    const grid = [];
    for (let i = 0; i < lines; i++) {
      grid.push(new Array(columns).fill(0));
    }
    return grid;
  };