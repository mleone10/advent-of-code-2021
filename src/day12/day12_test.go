package day12_test

import (
	"testing"

	"github.com/mleone10/advent-of-code-2021/src/day12"
	"github.com/mleone10/advent-of-code-2021/test"
)

func TestDay12(t *testing.T) {
	tcs := []test.TestCase[int]{
		{
			Input: `start-A
			start-b
			A-c
			A-b
			b-d
			A-end
			b-end`,
			ExpectedPartOne: 10,
			ExpectedPartTwo: 36,
		},
		{
			Input: `dc-end
			HN-start
			start-kj
			dc-start
			dc-HN
			LN-dc
			HN-end
			kj-sa
			kj-HN
			kj-dc`,
			ExpectedPartOne: 19,
			ExpectedPartTwo: 103,
		},
		{
			Input: `fs-end
			he-DX
			fs-he
			start-DX
			pj-DX
			end-zg
			zg-sl
			zg-pj
			pj-he
			RW-he
			fs-DX
			pj-RW
			zg-RW
			start-pj
			he-WI
			zg-he
			pj-fs
			start-RW`,
			ExpectedPartOne: 226,
			ExpectedPartTwo: 3509,
		},
	}

	input := `XW-ed
	cc-tk
	eq-ed
	ns-eq
	cc-ed
	LA-kl
	II-tk
	LA-end
	end-II
	SQ-kl
	cc-kl
	XW-eq
	ed-LA
	XW-tk
	cc-II
	tk-LA
	eq-II
	SQ-start
	LA-start
	XW-end
	ed-tk
	eq-JR
	start-kl
	ed-II
	SQ-tk`

	for _, tc := range tcs {
		test.ValidateSolution[int](t, day12.Day12{Input: tc.Input}, tc)
	}

	test.Solve[int](t, day12.Day12{Input: input})
}
