package day14

import (
	"strings"
)

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

// BUG: This is apparently nonperformant for 40 iterations...
func (p *Puzzle) Step() {
	newTemplate := []string{}

	for i := 0; i < len(p.Template)-1; i++ {
		newTemplate = append(newTemplate, string(p.Template[i]))
		if new, ok := p.Rules[p.Template[i:i+2]]; ok {
			newTemplate = append(newTemplate, new)
		}
	}

	newTemplate = append(newTemplate, string(p.Template[len(p.Template)-1]))

	p.Template = strings.Join(newTemplate, "")
}

func (p *Puzzle) StepN(n int) {
	for i := 0; i < n; i++ {
		p.Step()
	}
}

func (p *Puzzle) Checksum() int {
	counts := map[string]int{}

	for _, c := range p.Template {
		counts[string(c)] += 1
	}

	max, min := 0, 99999
	for _, v := range counts {
		if v > max {
			max = v
		} else if v < min {
			min = v
		}
	}

	return max - min
}
