package test

import "testing"

type TestCase[T comparable] struct {
	Input           string
	ExpectedPartOne T
	ExpectedPartTwo T
}

type Solution[T comparable] interface {
	SolvePartOne() (T, error)
	SolvePartTwo() (T, error)
}

func ValidateSolution[T comparable](t *testing.T, solution Solution[T], tc TestCase[T]) {
	actualPartOne, err := solution.SolvePartOne()
	if err != nil {
		t.Fatalf("part one: %v", err)
	}
	if actualPartOne != tc.ExpectedPartOne {
		t.Fatalf("part one: expected %v, got %v", tc.ExpectedPartOne, actualPartOne)
	}

	actualPartTwo, err := solution.SolvePartTwo()
	if err != nil {
		t.Fatalf("part two: %v", err)
	}
	if actualPartTwo != tc.ExpectedPartTwo {
		t.Fatalf("part two: expected %v, got %v", tc.ExpectedPartTwo, actualPartTwo)
	}
}

func Solve[T comparable](t *testing.T, solution Solution[T]) {
	s1, err := solution.SolvePartOne()
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("part one answer: %v", s1)

	s2, err := solution.SolvePartTwo()
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("part two answer: %v", s2)
}
