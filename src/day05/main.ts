import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

let lines: Array<string> = []
rl.on("line", (line: string) => {
  lines.push(line);
});

rl.on("close", () => {
  const diagonal = (coords: number[][]) => !(coords[0][0] == coords[1][0] || coords[0][1] == coords[1][1])
  const pairs = lines.map(l => l.split(" -> ").map(p => p.split(",").map(v => parseInt(v))))
  const addLineToGrid = (grid: number[][], line: number[][]) => {
    pointsInLine(line).forEach(point => {
      if (grid[point[0]] == undefined) {
        grid[point[0]] = []
      }
      grid[point[0]][point[1]] = (grid[point[0]][point[1]] ?? 0) + 1
    })
    return grid
  }
  const calcScore = (res: number, row: number[]) => {
    return row.reduce((res, p) => {
      return p >= 2 ? ++res : res
    }, res)
  }

  console.log("Part 1:", pairs.filter(l => !diagonal(l)).reduce((res, cur) => addLineToGrid(res, cur)).reduce((res, row) => calcScore(res, row), 0))
  console.log("Part 2", pairs.reduce((res, cur) => addLineToGrid(res, cur)).reduce((score, row) => calcScore(score, row), 0))
})

function pointsInLine(coords: number[][]): number[][] {
  // Need to refactor this to work for diagonal lines as well
  const min = (x: number, y: number) => x > y ? y : x
  const max = (x: number, y: number) => x > y ? x : y

  const points: number[][] = []
  if (coords[0][0] == coords[1][0]) {
    for (let i = min(coords[0][1], coords[1][1]); i <= max(coords[0][1], coords[1][1]); i++) {
      points.push([coords[0][0], i])
    }
  } else {
    for (let i = min(coords[0][0], coords[1][0]); i <= max(coords[0][0], coords[1][0]); i++) {
      points.push([i, coords[0][1]])
    }
  }

  return points
}
