package day13

import (
	"strconv"
	"strings"
)

type Puzzle struct {
	Paper []dot
	Insts []instruction
}

type dot struct {
	x, y int
}

type instruction struct {
	coord int
	left  bool
}

func NewPuzzle(input string) (Puzzle, error) {
	paper := []dot{}
	insts := []instruction{}

	for _, l := range strings.Split(input, "\n") {
		if xStr, yStr, ok := strings.Cut(l, ","); ok {
			x, err := strconv.Atoi(xStr)
			if err != nil {
				return Puzzle{}, err
			}
			y, err := strconv.Atoi(yStr)
			if err != nil {
				return Puzzle{}, err
			}
			paper = append(paper, dot{x, y})
		} else if axis, coordStr, ok := strings.Cut(l, "="); ok {
			coord, err := strconv.Atoi(coordStr)
			if err != nil {
				return Puzzle{}, err
			}
			if axis == "y" {
				insts = append(insts, instruction{coord, true})
			} else {
				insts = append(insts, instruction{coord, false})
			}
		}
	}

	return Puzzle{
		Paper: paper,
		Insts: insts,
	}, nil
}
