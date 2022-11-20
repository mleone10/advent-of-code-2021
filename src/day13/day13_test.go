package day13_test

import (
	"testing"

	"github.com/mleone10/advent-of-code-2021/src/day13"
)

const testInput string = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

func TestInputParsing(t *testing.T) {
	p, err := day13.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	if len(p.Paper) != 18 {
		t.Fatalf("expected 18, got %v", len(p.Paper))
	}

	if len(p.Insts) != 2 {
		t.Fatalf("expected 2, got %v", len(p.Insts))
	}
}
