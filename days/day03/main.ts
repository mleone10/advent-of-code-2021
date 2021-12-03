import { BADHINTS } from "dns";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
});

const lines: Array<Array<number>> = []
rl.on("line", (line: string) => {
  const l: Array<number> = []
  for (let c of line) {
    l.push(parseInt(c))
  }
  lines.push(l)
})


rl.on("close", () => {
  console.log(calcPowerConsumption(lines))
  console.log(calcLifeSupport(lines))
})

function calcAvgs(lines: Array<Array<number>>): Array<number> {
  const avgs: Array<number> = []
  let numLines = 0
  for (let l of lines) {
    numLines++
    for (let i = 0; i < l.length; i++) {
      let cur = avgs[i]
      avgs[i] = cur == undefined ? l[i] : ((cur * (numLines - 1)) + l[i]) / numLines
    }
  }
  return avgs
}

function calcPowerConsumption(lines: Array<Array<number>>): number {
  let bGamma = ""
  let bEpsilon = ""

  for (let a of calcAvgs(lines)) {
    const mean = Math.round(a)
    bGamma += mean
    bEpsilon += mean == 1 ? 0 : 1

  }
  return parseInt(bGamma, 2) * parseInt(bEpsilon, 2)
}

function calcLifeSupport(lines: Array<Array<number>>): number {
  const bOxy = calcBit(lines, 0, (i: number) => {
    return i == 0.5 ? 1 : Math.round(i)
  })

  const bC02 = calcBit(lines, 0, (i: number) => {
    return i == 0.5 ? 0 : Math.round(i) == 1 ? 0 : 1
  })

  return parseInt(bOxy, 2) * parseInt(bC02, 2)
}

function calcBit(lines: Array<Array<number>>, bit: number, bitCriteria: (i: number) => number): string {
  const subLines: Array<Array<number>> = []
  const validBit = bitCriteria(calcAvgs(lines)[bit])
  for (let l of lines) {
    if (l[bit] == validBit) {
      subLines.push(l)
    }
  }

  if (subLines.length == 1) {
    return subLines[0].join("")
  }

  return calcBit(subLines, bit + 1, bitCriteria)
}
