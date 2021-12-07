import processStdin from "../readStdin";

const abs = (x: number) => x >= 0 ? x : x * -1
const min = (x: number, y: number) => x < y ? x : y

processStdin(ls => {
  const sortedInts = ls[0]
    .split(",")
    .map(p => parseInt(p))
    .sort((x: number, y: number) => x - y)

  const candidates = Array.from(Array(sortedInts[sortedInts.length - 1]).keys())
    .map(i => i + sortedInts[0])

  console.log(
    "Part 1:",
    candidates.reduce((best, val) => {
      return min(best, sortedInts
        .reduce((sum, v) => {
          return sum + abs(val - v)
        }, 0))
    }, Infinity)
  )

  console.log(
    "Part 2:",
    candidates.reduce((best, val) => {
      return min(best, sortedInts
        .reduce((sum, v) => {
          for (let i = 0; i <= abs(val - v); i++) {
            sum += i
          }
          return sum
        }, 0))
    }, Infinity)
  )
})
