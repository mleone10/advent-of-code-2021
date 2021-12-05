import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  crlfDelay: Infinity
})

let lines: Array<string> = []
rl.on("line", (line: string) => {
  lines.push(line);
})

rl.on("close", () => {
  const nums = lines[0].split(",").map((i) => parseInt(i))
  const cards = lines.slice(2).filter(l => l).reduce((resultCards, cur, i) => {
    const cardIndex = Math.floor(i / 5)

    if (!resultCards[cardIndex]) {
      resultCards[cardIndex] = []
    }

    resultCards[cardIndex].push(cur.trim().split(/\s+/).map((i) => parseInt(i)))

    return resultCards
  }, [] as number[][][])

  console.log("Part 1 winning score:", playBingo(nums, cards))
  console.log("Part 2 winning score:", letSquidWin(nums, cards))
})

function playBingo(nums: number[], cards: number[][][]): number {
  const called: number[] = []

  for (const n of nums) {
    called.push(n)
    const winner = cards.find(c => hasWon(called, c))
    if (winner) {
      return calcScore(called, winner)
    }
  }

  return 0
}

function letSquidWin(nums: number[], cards: number[][][]): number {
  return 0
}

function hasWon(nums: number[], card: number[][]): boolean {
  const allCalled = (nums: number[], row: number[]) => row.every(i => nums.includes(i))
  const transposed = (card: number[][]) => card.map((_, i) => card.map(row => row[i]));

  return card.concat(transposed(card)).some(r => allCalled(nums, r))
}

function calcScore(called: number[], card: number[][]): number {
  return card.flat().filter(i => !called.find(c => c == i)).reduce((sum, current) => sum += current) * called[called.length - 1]
}
