package day12

import (
	"strings"
)

type caveLabel string

type Day12 struct {
	Input  string
	system map[caveLabel][]caveLabel
}

func (d Day12) SolvePartOne() (int, error) {
	d.init()

	paths, err := d.countPaths()
	if err != nil {
		return 0, err
	}

	return paths, nil
}

func (d Day12) SolvePartTwo() (int, error) {
	d.init()
	return 0, nil
}

func (d *Day12) init() {
	system := map[caveLabel][]caveLabel{}

	for _, link := range strings.Split(d.Input, "\n") {
		a, b, _ := strings.Cut(strings.TrimSpace(link), "-")
		caveA, caveB := caveLabel(a), caveLabel(b)

		if system[caveA] == nil {
			system[caveA] = []caveLabel{}
		}
		system[caveA] = append(system[caveA], caveB)

		if system[caveB] == nil {
			system[caveB] = []caveLabel{}
		}
		system[caveB] = append(system[caveB], caveA)
	}

	d.system = system
}

func (d Day12) countPaths() (int, error) {
	return 0, nil
}
