import processStdin from "../readStdin";

processStdin(ls => {
  console.log(
    "Part 1:",
    ls
      .reduce((sum, line, iLine, grid) => {
        const numGrid = grid.map(l => l.split("").map(p => parseInt(p)))
        return sum + numGrid[iLine].reduce((sum, point, iPoint, numLine) => {
          const isLow = [-1, 0, 1].reduce((isLow, dY) => {
            return isLow && [-1, 0, 1].reduce((isLow, dX) => {
              const x = iPoint + dX
              const y = iLine + dY
              return x >= 0 && y >= 0 && x < numLine.length && y < numGrid.length ? isLow && numGrid[y][x] >= point : isLow
            }, true)
          }, true)
          return sum + (isLow ? 1 + point : 0)
        }, 0)
      }, 0)
  )
})
