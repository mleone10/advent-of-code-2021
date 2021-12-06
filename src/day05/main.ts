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
  const pairs = lines.map(l => l.split(" -> ").map(p => p.split(",").map(v => parseInt(v)))).filter(l => !diagonal(l))
  const grid = pairs.reduce((res, cur) => {
    pointsInLine(cur).forEach(point => {
      if (res[point[0]] == undefined) {
        res[point[0]] = []
      }
      res[point[0]][point[1]] = (res[point[0]][point[1]] ?? 0) + 1
    })
    return res
  }, new Array<Array<number>>())

  console.log("Part 1:", grid.reduce((res, row) => {
    return row.reduce((res, p) => {
      return p >= 2 ? ++res : res
    }, res)
  }, 0))
});

const diagonal = (coords: number[][]) => !(coords[0][0] == coords[1][0] || coords[0][1] == coords[1][1])

function pointsInLine(coords: number[][]): number[][] {
  return [[0, 0]]
}
