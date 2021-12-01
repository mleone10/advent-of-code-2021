import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

let depths: Array<number> = []
rl.on("line", (line: string) => {
  depths.push(parseInt(line));
});

rl.on("close", () => {
  console.log(calcDepthIncreases(depths));
  console.log(calcRelativeDepthIncreases(depths));
});

function calcDepthIncreases(depths: Array<number>): number {
  let increases: number = 0
  depths.slice(0, -1).forEach((d, i) => {
    if (d < depths[i + 1]) {
      increases += 1;
    }
  })
  return increases;
}

function calcRelativeDepthIncreases(depths: Array<number>): number {
  let increases: number = 0;
  depths.slice(0, -2).forEach((d, i) => {
    if (d + depths[i + 1] + depths[i + 2] < depths[i + 1] + depths[i + 2] + depths[i + 3]) {
      increases += 1;
    }
  })
  return increases;
}
