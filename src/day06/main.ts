import processStdin from "../readStdin";

processStdin(ls => {
  let fish: number[] = ls[0].split(",").map(v => parseInt(v))

  console.log("Part 1:", calcNumFishAfterN(Array.from(fish), 80))
  console.log("Part 2:", calcNumFishAfterN(Array.from(fish), 256))
})

function calcNumFishAfterN(fish: number[], days: number) {
  for (let i = 0; i < days; i++) {
    const newFish: number[] = []

    fish.forEach(f => {
      if (f == 0) {
        newFish.push(6, 8)
      } else {
        newFish.push(f - 1)
      }
    })

    fish = newFish
  }

  return fish.length
}
