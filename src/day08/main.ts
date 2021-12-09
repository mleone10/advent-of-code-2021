import processStdin from "../readStdin";

processStdin(ls => {
  console.log(
    "Part 1:",
    ls
      .map(l => l.split(" | ")[1].split(" "))
      .reduce((sum, vs) => sum + vs.filter(v => [2, 3, 4, 7].includes(v.length)).length, 0)
  )

  console.log(
    "Part 2:",
    ls
      .map(l => l.split(" | "))
      .map(l => calcOutput(l[0].split(" "), l[1].split(" ")))
      .reduce((sum, cur) => sum + cur)
  )
})

function calcOutput(dIn: string[], dOut: string[]): number {
  const sortedDs = dIn.map(d => d.split("").sort().join(""))
  const ds: string[] = []

  // These four are the easy ones since they all have a unique number of segments.
  ds[1] = sortedDs.filter(d => d.length == 2)[0]
  ds[4] = sortedDs.filter(d => d.length == 4)[0]
  ds[7] = sortedDs.filter(d => d.length == 3)[0]
  ds[8] = sortedDs.filter(d => d.length == 7)[0]

  // We sometimes check if a digit contains certain segments.  Define a reusable curried function here.
  const containsSegments = (ss: string[]) => (d: string) => {
    return ss.map(s => d.split("").includes(s)).every(f => f == true)
  }

  // Then define reusable "contains" functions.
  const containsSegOne = containsSegments(ds[1].split(""))
  const containsSegFour = containsSegments(ds[4].split("").filter(s => !ds[1].includes(s)))

  // Now figure out the 5-segment digits.
  const dsFive = sortedDs.filter(d => d.length == 5)
  ds[3] = dsFive.filter(d => containsSegOne(d))[0] // The 5-segment digit that overlaps with 1 is 3.
  ds[5] = dsFive.filter(d => d != ds[3]).filter(d => containsSegFour(d))[0] // The one that contains the unique segments of 4 is 5.
  ds[2] = dsFive.filter(d => ![ds[3], ds[5]].includes(d))[0] // The one that's left is 2.

  // Finally, figure out the 6-segment digits using similar methods.
  const dsSix = sortedDs.filter(d => d.length == 6)
  ds[9] = dsSix.filter(d => containsSegFour(d)).filter(d => containsSegOne(d))[0] // The 6-segment digit that contains both 1 and the unique segments of 4 is 9.
  ds[6] = dsSix.filter(d => containsSegFour(d)).filter(d => !containsSegOne(d))[0] // The one that contains the unique segments of 4 but not 1 is 6.
  ds[0] = dsSix.filter(d => ![ds[9], ds[6]].includes(d))[0] // The one that's left is 0.

  // Now we have our key, just find the index of each output digit.
  return parseInt(dOut.map(d => d.split("").sort().join("")).map(d => ds.indexOf(d)).map(d => d.toString()).join(""))
}
