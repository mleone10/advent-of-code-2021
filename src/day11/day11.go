package day11

import (
	"strconv"
	"strings"
)

type octopus struct {
	energy  int
	flashed bool
}

type Day11 struct {
	Input  string
	octopi [][]octopus
}

func (d *Day11) init() error {
	// TODO: extract 2D array init impl
	ls := strings.Split(strings.TrimSpace(d.Input), "\n")

	octopi := make([][]octopus, len(ls))
	for i := range octopi {
		octopi[i] = make([]octopus, len(ls[i]))
	}

	for i, l := range ls {
		for j, r := range strings.Split(l, "") {
			v, err := strconv.Atoi(r)
			if err != nil {
				return err
			}
			octopi[i][j] = octopus{v, false}
		}
	}

	d.octopi = octopi

	return nil
}

func (d Day11) SolvePartOne() (int, error) {
	err := d.init()
	if err != nil {
		return 0, err
	}

	flashes := 0

	for s := 0; s < 100; s++ {
		flashes += d.step()
	}

	return flashes, nil
}

func (d Day11) SolvePartTwo() (int, error) {
	err := d.init()
	if err != nil {
		return 0, err
	}

	maxFlashes := len(d.octopi) * len(d.octopi[0])

	for i := 1; ; i++ {
		flashes := d.step()
		if flashes == maxFlashes {
			return i, nil
		}
	}
}

func (d Day11) step() int {
	d.incrementAllOctopi()
	f := d.processFlashes()
	d.resetFlashedOctopi()
	return f
}

func (d Day11) incrementAllOctopi() {
	for i, r := range d.octopi {
		for j := range r {
			d.octopi[i][j].energy++
		}
	}
}

func (d Day11) processFlashes() int {
	flashes := 0

	for i, r := range d.octopi {
		for j, v := range r {
			if v.energy > 9 && !v.flashed {
				flashes++
				d.octopi[i][j].flashed = true
				d.incrementAdjacent(j, i)
			}
		}
	}

	if flashes != 0 {
		flashes += d.processFlashes()
	}

	return flashes
}

func (d Day11) incrementAdjacent(x, y int) {
	for _, i := range []int{y - 1, y, y + 1} {
		for _, j := range []int{x - 1, x, x + 1} {
			if !(i == y && j == x) && i >= 0 && j >= 0 && i < len(d.octopi) && j < len(d.octopi[0]) {
				d.octopi[i][j].energy++
			}
		}
	}
}

func (d Day11) resetFlashedOctopi() {
	for i, r := range d.octopi {
		for j := range r {
			if d.octopi[i][j].flashed {
				d.octopi[i][j].energy = 0
				d.octopi[i][j].flashed = false
			}
		}
	}
}
