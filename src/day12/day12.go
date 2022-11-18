package day12

import (
	"log"
	"strings"
)

type caveLabel string
type path []caveLabel

type Day12 struct {
	Input  string
	system map[caveLabel][]caveLabel
	paths  [][]caveLabel
}

func (d Day12) SolvePartOne() (int, error) {
	d.init()

	d.computePaths(path{}, caveLabel("start"))

	return 0, nil
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

func (d Day12) computePaths(path path, cur caveLabel) {
	log.Printf("hello?")
	if cur == "end" {
		path = append(path, "end")
		log.Printf("terminal path: %v", path)
		d.paths = append(d.paths, path)
		return
	}

	for _, neighbor := range d.system[cur] {
		if neighbor.isSmallCave() && path.contains(neighbor) {
			continue
		}
		path = append(path, neighbor)
		log.Printf("continuing path: %v", path)
		d.computePaths(path, neighbor)
	}
}

func (c caveLabel) isSmallCave() bool {
	cave := string(c)
	return strings.ToLower(cave) == string(cave)
}

func (p path) contains(c caveLabel) bool {
	return false
}
