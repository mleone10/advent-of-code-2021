package day12

import (
	"log"
	"strings"
	"time"
)

type caveLabel string

type Day12 struct {
	Input              string
	smallCaveMaxVisits int
	system             map[caveLabel][]caveLabel
}

func (d Day12) SolvePartOne() (int, error) {
	time.Sleep(time.Second * 5)
	d.init()
	d.smallCaveMaxVisits = 1

	return d.countPaths([]caveLabel{}, caveLabel("start")), nil
}

func (d Day12) SolvePartTwo() (int, error) {
	d.init()
	d.smallCaveMaxVisits = 2

	return d.countPaths([]caveLabel{}, caveLabel("start")), nil
}

func (d *Day12) init() {
	// Build the adjacency list representing the cave system
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

func (d *Day12) countPaths(path []caveLabel, cur caveLabel) int {
	path = append(path, cur)

	if isEndCave(cur) {
		// We've reached the end of a valid path
		log.Println(path)
		return 1
	}

	paths := 0
	// Recurse through each neighbor of this one and see how many lead to valid paths
	for _, neighbor := range d.system[cur] {
		if isStartCave(neighbor) {
			// If the neighbor we're considering is the start cave, move on.  Can't go back to start.
			continue
		}

		// BUG: this allows _all_ small caves to be visited twice.  We need to remember if _any_ was visited twice.
		if !isSmallCave(neighbor) || isLegalSmallCave(path, neighbor, d.smallCaveMaxVisits) {
			paths += d.countPaths(path, neighbor)
		}
	}

	return paths
}

func isEndCave(c caveLabel) bool {
	return c == "end"
}

func isStartCave(c caveLabel) bool {
	return c == "start"
}

func isSmallCave(c caveLabel) bool {
	cave := string(c)
	return strings.ToLower(cave) == string(cave)
}

func isLegalSmallCave(path []caveLabel, c caveLabel, n int) bool {
	occurences := map[caveLabel]int{}

	for _, cave := range path {
		if !isSmallCave(cave) {
			// We're only counting small caves.  Move on.
			continue
		}

		occurences[cave] += 1

		// If any small cave has been visited more than twice,
		if occurences[cave] > 2 {
			return false
		}
	}
	// occurences := 0

	// for _, cave := range path {
	// 	if cave == c {
	// 		occurences += 1
	// 	}
	// }

	// return occurences < n
}
