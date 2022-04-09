import { ref } from "vue";

class PatternLine {
  ID: number;
  Pattern: number;

  constructor(ID: number, Pattern: number) {
    this.ID = ID;
    this.Pattern = Pattern;
  }
}

export class PatternMatrixLine {
  Position: number;
  Pattern: Array<PatternLine>;

  constructor(Position: number, Pattern: Array<PatternLine>) {
    this.Pattern = Pattern;
    this.Position = Position;
  }
}

export var PatternMatrix: Array<PatternMatrixLine> = [
  new PatternMatrixLine(0, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(1, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(2, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(3, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(4, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(5, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(6, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(7, [new PatternLine(0, 0), new PatternLine(1, 0)]),
  new PatternMatrixLine(8, [new PatternLine(0, 0), new PatternLine(1, 0)]),
];

export var MatrixPosition = ref(0);
