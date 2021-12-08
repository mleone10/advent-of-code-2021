import processStdin from "../readStdin";

processStdin(ls => {
  console.log(
    "Part 1:",
    ls
      .map(l => l.split(" | ")[1].split(" "))
      .reduce((sum, vs) => sum + vs.filter(v => [2, 3, 4, 7].includes(v.length)).length, 0)
  )
})
