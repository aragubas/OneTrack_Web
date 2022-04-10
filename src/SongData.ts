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
    this.Position = Position;
    this.Pattern = Pattern;
  }
}

export var PatternMatrix = ref(Array<PatternMatrixLine>());

export function NewFile() {
  let newMatrix = new Array<PatternMatrixLine>();

  // 4 initial matrix lines
  for (let i = 0; i < 4; i++) {
    let lines = new Array<PatternLine>();

    // Add channels representations
    for (let i2 = 0; i2 < Channels.value; i2++) {
      lines.push(new PatternLine(i2, 0));
    }

    let matrixLine = new PatternMatrixLine(i, lines);
    newMatrix.push(matrixLine);
  }

  PatternMatrix.value = newMatrix;
}

export var MatrixPosition = ref(0);
export var Channels = ref(2);
