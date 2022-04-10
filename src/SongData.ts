import { ref } from "vue";

export var Channels = ref(Array<Channel>());
export var PatternMatrix = ref(Array<PatternMatrixLine>());
export var ChannelCount = ref(2);
export var PatternLength = ref(16);
export var MatrixPosition = ref(0);
export var ChannelNeddlePosition = ref(0);

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

export class Note {
  pitch: number;
  instrument_number: number;
  effect_string: string;
  index: number;
  UID: string;

  constructor(
    pitch: number,
    instrument_number: number,
    effect_string: string,
    index: number
  ) {
    this.pitch = pitch;
    this.instrument_number = instrument_number;
    this.effect_string = effect_string;
    this.UID = uuidv4();
    this.index = index;
  }
}

export class Pattern {
  ID: number;
  Notes: Array<Note>;

  constructor(ID: number, Notes: Array<Note>) {
    this.ID = ID;
    this.Notes = Notes;
  }
}

export class Channel {
  ID: number;
  Patterns: Array<Pattern>;

  constructor(ID: number, Patterns: Array<Pattern>) {
    this.ID = ID;
    this.Patterns = Patterns;
  }
}

export function NewFile() {
  let newMatrix = new Array<PatternMatrixLine>();

  // 4 initial matrix lines
  for (let i = 0; i < 4; i++) {
    let lines = new Array<PatternLine>();

    // Add channels representations
    for (let i2 = 0; i2 < ChannelCount.value; i2++) {
      lines.push(new PatternLine(i2, 0));
    }

    let matrixLine = new PatternMatrixLine(i, lines);
    newMatrix.push(matrixLine);
  }

  PatternMatrix.value = newMatrix;

  for (var i = 0; i < ChannelCount.value; i++) {
    let patterns = Array<Pattern>();
    let notes = Array<Note>();

    for (let i2 = 0; i2 < PatternLength.value; i2++) {
      notes.push(new Note(0, 0, "________", i2));
    }

    patterns.push(new Pattern(0, notes));

    Channels.value.push(new Channel(i, patterns));
  }

  console.log(Channels.value);
}

export function AddPattern(channelID: number) {
  let notes = Array<Note>();

  // Fill in blank notes
  for (let i2 = 0; i2 < PatternLength.value; i2++) {
    notes.push(new Note(0, 0, "________", i2));
  }

  Channels.value[channelID].Patterns.push(
    new Pattern(Channels.value[channelID].Patterns.length, notes)
  );
}

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
