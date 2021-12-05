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

  // There may be some way to clean this up.  Reduce nums?
  for (const n of nums) {
    // "Call" the next number, then check if any card won.
    // If one has, return its score.
    called.push(n)
    const winner = cards.find(c => hasWon(called, c))
    if (winner) {
      return calcScore(called, winner)
    }
  }

  // If no winner found, return zero.  Shouldn't happen given well-formed inputs.
  return 0
}

function letSquidWin(nums: number[], cards: number[][][]): number {
  return 0
}

function hasWon(nums: number[], card: number[][]): boolean {
  const allCalled = (nums: number[], row: number[]) => row.every(i => nums.includes(i))
  const transposed = (card: number[][]) => card.map((_, i) => card.map(row => row[i]));

  // Concatenate the cards rows with the card's transposed rows (thus getting an array of all rows and columns).
  // Then check if any row has been entirely called.
  return card.concat(transposed(card)).some(r => allCalled(nums, r))
}

function calcScore(called: number[], card: number[][]): number {
  // Given a card, flatten the 2D array into a 1D array, remove any element that has been called.
  // Then sum them up before multiplying by the last called number.
  return card.flat().filter(i => !called.includes(i)).reduce((sum, current) => sum += current) * called[called.length - 1]
}
