import processStdin from "../readStdin";

processStdin(ls => {
  // Convert the list of lines to a 2D array of integers for simplicity.
  const numGrid = ls.map(l => l.split("").map(p => parseInt(p)))

  // The list of low points' coordinates is used in both parts.  Just iterate through all points and check if it's the lowest of all its neighbors.
  const lowPoints = numGrid.reduce((res, line, iLine) => {
    return res.concat(line.reduce((res, _, iCol) => {
      const neighbors = [
        iCol > 0 ? numGrid[iLine][iCol - 1] : Infinity,
        iCol < numGrid[0].length - 1 ? numGrid[iLine][iCol + 1] : Infinity,
        iLine > 0 ? numGrid[iLine - 1][iCol] : Infinity,
        iLine < numGrid.length - 1 ? numGrid[iLine + 1][iCol] : Infinity
      ]

      return neighbors.every(n => n > numGrid[iLine][iCol]) ? res.concat([[iCol, iLine]]) : res
    }, [] as number[][]))
  }, [] as number[][])

  // This recursive function performs a four-directional flood fill from a given low point to find the size of that low point's basin.
  const calcBasinSize = (p: number[], seen: boolean[][]): number => {
    // If this point is out of bounds, a high point (9), or we've already been here, return 0.
    if (p.some(c => c < 0) || p[1] >= numGrid.length || p[0] >= numGrid[0].length || numGrid[p[1]][p[0]] == 9 || (seen[p[1]] && seen[p[1]][p[0]])) {
      return 0
    }

    // Otherwise, remember we've been here.
    if (!seen[p[1]]) {
      seen[p[1]] = []
    }
    seen[p[1]][p[0]] = true

    // Then recurse in all directions, returning the sum of that recursion.
    return 1 +
      calcBasinSize([p[0] - 1, p[1]], seen) +
      calcBasinSize([p[0] + 1, p[1]], seen) +
      calcBasinSize([p[0], p[1] - 1], seen) +
      calcBasinSize([p[0], p[1] + 1], seen)
  }

  // For Part 1, add up the value of each low point.
  console.log(
    "Part 1:",
    lowPoints.reduce((sum, p) => {
      return sum + numGrid[p[1]][p[0]] + 1
    }, 0)
  )

  // For Part 2, calculate the size of each basin, sort the sizes, and find the product of the top three.
  console.log(
    "Part 2:",
    lowPoints.map(p => calcBasinSize(p, [])).sort((a, b) => a - b).slice(-3).reduce((sum, n) => sum * n)
  )
})
