import processStdin from "../readStdin";

const charPairs = new Map([["(", ")"], ["[", "]"], ["{", "}"], ["<", ">"]])
const corruptScores = new Map([[")", 3], ["]", 57], ["}", 1197], [">", 25137]])
const autoCompleteScores = new Map([[")", 1], ["]", 2], ["}", 3], [">", 4]])

processStdin(ls => {
  // For Part 1, identify the first incorrect character in each line, remove blanks (non-currupt lines), and add up the scores.
  console.log(
    "Part 1",
    ls
      .map(l => findFirstIncorrectChar(l, []))
      .filter(c => c)
      .reduce((sum, s) => sum + (corruptScores.get(s) || 0), 0)
  )

  // For Part 2, identify the list of auto-complete strings, convert each to a score, and identify the middle one.
  const scores = ls
    .map(l => calcAutoCompleteString(l, []))
    .filter(c => c)
    .map(l => l.split("").reduce((sum, c) => (sum * 5) + (autoCompleteScores.get(c) || 0), 0))
    .sort((a, b) => a - b)
  console.log(
    "Part 2",
    scores[Math.floor(scores.length / 2)]
  )
})

// This function resurses through a given string and uses a stack to determine the first incorrect closing bracket.
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

// This function recurses through a given string and uses a stack to determine the required sequence of closing brackets to complete it.
function calcAutoCompleteString(l: string, cs: string[]): string {
  if (l.length == 0) {
    return cs.reverse().map(c => charPairs.get(c)).join("")
  }

  if (Array.from(charPairs.keys()).includes(l[0])) {
    cs.push(l[0])
  } else {
    const c = cs.pop() || ""
    if (charPairs.get(c) != l[0]) {
      return ""
    }
  }

  return calcAutoCompleteString(l.slice(1), cs)
}
