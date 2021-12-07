import processStdin from "../readStdin";

processStdin(ls => {
  let fish: number[] = ls[0].split(",").map(v => parseInt(v))

  console.log("Part 1:", calcNumFishAfterN(Array.from(fish), 80))
  console.log("Part 2:", calcNumFishAfterN(Array.from(fish), 256))
})

function calcNumFishAfterN(fish: number[], days: number) {
  // Rather than track an array of each fish, track the number of fish by days left.
  // E.g. instead of [3, 4, 3, 1, 2], store [0, 1, 1, 2, 1].
  let fishBySpawnTime: number[] = []
  fish.forEach(f => {
    fishBySpawnTime[f] = fishBySpawnTime[f] == undefined ? 1 : fishBySpawnTime[f] += 1
  })

  // Simulate the given number of days.
  for (let i = 0; i < days; i++) {
    fishBySpawnTime = calcNextTick(fishBySpawnTime)
  }

  // The sum values in the final array represent the total number of fish.
  return fishBySpawnTime.reduce((res, num) => {
    return res + num
  })
}

function calcNextTick(fishBySpawnTime: number[]): number[] {
  const newFishBySpawnTime: number[] = []
  fishBySpawnTime.forEach((v, i) => {
    if (i == 0) {
      newFishBySpawnTime[8] = v // New fish being born!
      newFishBySpawnTime[6] = newFishBySpawnTime[6] == undefined ? v : newFishBySpawnTime[6] + v // Existing fish get reset to 6 days.
    } else {
      // Otherwise, just "decrement" the days left for these v fish.
      newFishBySpawnTime[i - 1] = newFishBySpawnTime[i - 1] == undefined ? v : newFishBySpawnTime[i - 1] + v
    }
  })

  return newFishBySpawnTime
}
