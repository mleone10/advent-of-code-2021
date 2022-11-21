package day14

import "strings"

type Puzzle struct {
	Template string
	Rules    map[string]string
}

func NewPuzzle(input string) (Puzzle, error) {
	rules := map[string]string{}
	var template string

	for _, line := range strings.Split(input, "\n") {
		if from, to, ok := strings.Cut(line, " -> "); ok {
			rules[from] = to
		} else if len(line) > 0 {
			template = line
		}
	}

	return Puzzle{
		Template: template,
		Rules:    rules,
	}, nil
}
