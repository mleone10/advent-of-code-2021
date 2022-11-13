package day11_test

import (
	"testing"

	"github.com/mleone10/advent-of-code-2021/src/day11"
	"github.com/mleone10/advent-of-code-2021/test"
)

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`
const testOutput = 1656
const testOutputTwo = 195

const input = `3265255276
1537412665
7335746422
6426325658
3854434364
8717377486
4522286326
6337772845
8824387665
6351586484
`

func TestDay11(t *testing.T) {
	tc := test.TestCase[int]{
		Input:           testInput,
		ExpectedPartOne: 1656,
		ExpectedPartTwo: 195,
	}

	test.ValidateSolution[int](t, day11.Day11{Input: tc.Input}, tc)

	test.Solve[int](t, day11.Day11{Input: input})
}
