import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

interface Position {
  x: number,
  y: number
}

interface PolarPosition extends Position {
  aim: number
}

const pos: Position = { x: 0, y: 0 }
const polar: PolarPosition = { x: 0, y: 0, aim: 0 }

rl.on("line", (line: string) => {
  const [move, dist] = line.split(" ");
  const numDist = parseInt(dist);

  switch (move) {
    case "forward": {
      pos.x += numDist;
      polar.x += numDist;
      polar.y += numDist * polar.aim;
      break
    }
    case "up": {
      pos.y -= numDist;
      polar.aim -= numDist;
      break
    }
    case "down": {
      pos.y += numDist;
      polar.aim += numDist;
      break
    }
  }
});

rl.on("close", () => {
  console.log(pos, pos.x * pos.y)
  console.log(polar, polar.x * polar.y)
});
