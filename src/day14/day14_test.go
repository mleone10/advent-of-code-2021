package day14_test

import (
	"testing"

	"github.com/mleone10/advent-of-code-2021/src/day14"
	"github.com/mleone10/advent-of-code-2021/test"
)

func TestParseInput(t *testing.T) {
	p, err := day14.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	test.AssertEquals(t, len(p.Rules), 16)
	test.AssertEquals(t, p.Template, "NNCB")
	test.AssertMapContainsKey(t, p.Rules, "CH")
	test.AssertMapContainsKey(t, p.Rules, "CN")
	test.AssertMapContainsKey(t, p.Rules, "BH")
	test.AssertEquals(t, p.Rules["CH"], "B")
	test.AssertEquals(t, p.Rules["CN"], "C")
	test.AssertEquals(t, p.Rules["BH"], "H")
}

func TestSingleStep(t *testing.T) {
	p, err := day14.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	p.Step()

	test.AssertEquals(t, p.Template, "NCNBCHB")
}

func TestFiveSteps(t *testing.T) {
	p, err := day14.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	p.StepN(5)

	test.AssertEquals(t, len(p.Template), 97)
}

func TestChecksum(t *testing.T) {
	p, err := day14.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	p.StepN(10)

	test.AssertEquals(t, p.Checksum(), 1588)
}

func TestSolvePartOne(t *testing.T) {
	p, err := day14.NewPuzzle(input)
	if err != nil {
		t.Fatal(err)
	}

	p.StepN(10)

	test.AssertEquals(t, p.Checksum(), 2602)
}

func TestFortySteps(t *testing.T) {
	t.SkipNow()
	p, err := day14.NewPuzzle(testInput)
	if err != nil {
		t.Fatal(err)
	}

	p.StepN(40)

	test.AssertEquals(t, p.Checksum(), 2188189693529)
}

func TestSolvePartTwo(t *testing.T) {
	t.SkipNow()
	p, err := day14.NewPuzzle(input)
	if err != nil {
		t.Fatal(err)
	}

	p.StepN(40)

	test.AssertEquals(t, p.Checksum(), 2602)
}

const testInput string = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

const input string = `COPBCNPOBKCCFFBSVHKO

NS -> H
FS -> O
PO -> C
NV -> N
CK -> B
FK -> N
PS -> C
OF -> F
KK -> F
PP -> S
VS -> K
VB -> V
BP -> P
BB -> K
BF -> C
NN -> V
NO -> F
SV -> C
OK -> N
PH -> P
KV -> B
PN -> O
FN -> V
SK -> V
VC -> K
BH -> P
BO -> S
HS -> H
HK -> S
HC -> S
HF -> B
PC -> C
CF -> B
KN -> H
CS -> N
SP -> O
VH -> N
CC -> K
KP -> N
NP -> C
FO -> H
FV -> N
NC -> F
KB -> N
VP -> O
KO -> F
CP -> F
OH -> F
KC -> H
NB -> F
HO -> P
SC -> N
FF -> B
PB -> H
FB -> K
SN -> B
VO -> K
OO -> N
NF -> B
ON -> P
SF -> H
FP -> H
HV -> B
NH -> B
CO -> C
PV -> P
VV -> K
KS -> P
OS -> S
SB -> P
OC -> N
SO -> K
BS -> B
CH -> V
PK -> F
OB -> P
CN -> N
CB -> N
VF -> O
VN -> K
PF -> P
SH -> H
FH -> N
HP -> P
KF -> V
BK -> H
OP -> C
HH -> F
SS -> V
BN -> C
OV -> F
HB -> P
FC -> C
BV -> H
VK -> S
NK -> K
CV -> K
HN -> K
BC -> K
KH -> P`
