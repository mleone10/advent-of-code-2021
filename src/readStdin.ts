import * as readline from "readline";

export default function processStdin(callback: (stdin: string[]) => void): void {
  const lines: string[] = []
  readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  }).on("line", (l: string) => {
    lines.push(l)
  }).on("close", () => {
    callback(lines)
  })
}
