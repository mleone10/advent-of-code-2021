package day13

import (
	"io"
	"log"
	"strconv"
	"strings"
)

type Puzzle struct {
	Paper map[int]map[int]bool
	Insts []instruction
}

type instruction struct {
	coord    int
	leftFold bool
}

func NewPuzzle(input string) (Puzzle, error) {
	paper := map[int]map[int]bool{}
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
			if paper[y] == nil {
				paper[y] = map[int]bool{}
			}
			paper[y][x] = true
		} else if axis, coordStr, ok := strings.Cut(l, "="); ok {
			coord, err := strconv.Atoi(coordStr)
			if err != nil {
				return Puzzle{}, err
			}
			if axis[len(axis)-1] == 'y' {
				log.Println()
				insts = append(insts, instruction{coord, false})
			} else {
				insts = append(insts, instruction{coord, true})
			}
		}
	}

	return Puzzle{
		Paper: paper,
		Insts: insts,
	}, nil
}

func (p *Puzzle) Step() {
	inst := p.Insts[0]
	p.Insts = p.Insts[1:]

	if inst.leftFold {
		p.foldLeft(inst.coord)
	} else {
		p.foldUp(inst.coord)
	}
}

func (p *Puzzle) foldLeft(x int) {
	for i, row := range p.Paper {
		for j := range row {
			if j < x {
				continue
			}
			newX := x - (j - x)
			p.Paper[i][newX] = true
			delete(p.Paper[i], j)
		}
	}
}

func (p *Puzzle) foldUp(y int) {
	for i, row := range p.Paper {
		if i < y {
			continue
		}
		for j := range row {
			newY := y - (i - y)
			if p.Paper[newY] == nil {
				p.Paper[newY] = map[int]bool{}
			}
			p.Paper[newY][j] = true
			delete(p.Paper[i], j)
		}
	}
}

func (p Puzzle) NumDots() int {
	num := 0
	for _, row := range p.Paper {
		for range row {
			num += 1
		}
	}
	return num
}

func (p Puzzle) Output(w io.Writer) {
	for i := 0; i < len(p.Paper); i++ {
		line := []byte{}
		for j := 0; j < 80; j++ {
			if _, ok := p.Paper[i][j]; ok {
				line = append(line, byte('#'))
			} else {
				line = append(line, byte('.'))
			}
		}
		line = append(line, byte('\n'))
		w.Write(line)
	}
}
