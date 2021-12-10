import processStdin from "../readStdin";

const charPairs = new Map([["(", ")"], ["[", "]"], ["{", "}"], ["<", ">"]])
const charScores = new Map([[")", 3], ["]", 57], ["}", 1197], [">", 25137]])

processStdin(ls => {
  // For Part 1, identify the first incorrect character in each line, remove blanks (non-currupt lines), and add up the scores.
  console.log(
    "Part 1",
    ls.map(l => findFirstIncorrectChar(l, [])).filter(c => c).reduce((sum, s) => sum + (charScores.get(s) || 0), 0)
  )
})

function findFirstIncorrectChar(l: string, cs: string[]): string {
  if (l.length == 0) {
    return ""
  }

  if (Array.from(charPairs.keys()).includes(l[0])) {
    cs.push(l[0])
  } else {
    const c = cs.pop() || ""
    if (charPairs.get(c) != l[0]) {
      return l[0]
    }
  }

  return findFirstIncorrectChar(l.slice(1), cs)
}
