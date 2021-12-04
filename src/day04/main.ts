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
});
