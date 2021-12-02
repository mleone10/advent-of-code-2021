import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

interface Position {
  x: number,
  y: number
}

interface Polar {
  pos: Position,
  aim: number
}

let pos: Position = { x: 0, y: 0 }
let polar: Polar = { pos: { x: 0, y: 0 }, aim: 0 }
rl.on("line", (line: string) => {
  let [move, dist] = line.split(" ");
  let numDist = parseInt(dist);
  switch (move) {
    case "forward": {
      pos.x += numDist;
      polar.pos.x += numDist;
      polar.pos.y += numDist * polar.aim;
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
  console.log(polar, polar.pos.x * polar.pos.y)
});
