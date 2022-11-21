package day14

type Puzzle struct {
	template string
	rules    map[string]string
}

func NewPuzzle(input string) (Puzzle, error) {
	return Puzzle{}, nil
}
