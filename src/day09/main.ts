import processStdin from "../readStdin";

processStdin(ls => {
  // Convert the list of lines to a 2D array of integers for simplicity.
  const numGrid = ls.map(l => l.split("").map(p => parseInt(p)))

  const isLowPoint = (x: number, y: number) => {
    const neighbors = [
      x > 0 ? numGrid[y][x - 1] : Infinity,
      x < numGrid[0].length - 1 ? numGrid[y][x + 1] : Infinity,
      y > 0 ? numGrid[y - 1][x] : Infinity,
      y < numGrid.length - 1 ? numGrid[y + 1][x] : Infinity
    ]

    return neighbors.every(n => n > numGrid[y][x])
  }

  // For Part 1, iterate through each point and check if it's the smallest of it's cardinal neighbors
  console.log(
    "Part 1:",
    numGrid.reduce((sum, line, iLine) => {
      return sum + line.filter((_, i) => isLowPoint(i, iLine)).reduce((sum, p) => {
        return sum + p + 1
      }, 0)
    }, 0)
  )
})
