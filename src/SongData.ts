import { ref } from "vue";

export var Channels = ref(Array<Channel>());
export var PatternMatrix = ref(Array<PatternMatrixLine>());
export var ChannelCount = ref(2);
export var PatternLength = ref(64);
export var MatrixPosition = ref(0);
export var ChannelNeedlePosition = ref(0);
export var Editor_CurrentScale = ref(4);

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

export enum Notes {
  C0 = 16,
  Cs0 = 17,
  D0 = 18,
  Ds0 = 19,
  E0 = 20,
  F0 = 21,
  Fs0 = 23,
  G0 = 24,
  Gs0 = 25,
  A0 = 27,
  As0 = 29,
  B0 = 30,
  C1 = 32,
  Cs1 = 34,
  D1 = 36,
  Ds1 = 38,
  E1 = 41,
  F1 = 43,
  Fs1 = 46,
  G1 = 49,
  Gs1 = 51,
  A1 = 55,
  As1 = 58,
  B1 = 61,
  C2 = 65,
  Cs2 = 69,
  D2 = 73,
  Ds2 = 77,
  E2 = 82,
  F2 = 87,
  Fs2 = 92,
  G2 = 98,
  Gs2 = 103,
  A2 = 110,
  As2 = 116,
  B2 = 123,
  C3 = 130,
  Cs3 = 138,
  D3 = 146,
  Ds3 = 155,
  E3 = 164,
  F3 = 174,
  Fs3 = 185,
  G3 = 196,
  Gs3 = 207,
  A3 = 220,
  As3 = 233,
  B3 = 246,
  C4 = 261,
  Cs4 = 277,
  D4 = 293,
  Ds4 = 311,
  E4 = 329,
  F4 = 349,
  Fs4 = 369,
  G4 = 392,
  Gs4 = 415,
  A4 = 440,
  As4 = 466,
  B4 = 493,
  C5 = 523,
  Cs5 = 554,
  D5 = 587,
  Ds5 = 622,
  E5 = 659,
  F5 = 698,
  Fs5 = 739,
  G5 = 783,
  Gs5 = 830,
  A5 = 880,
  As5 = 932,
  B5 = 987,
  C6 = 1046,
  Cs6 = 1108,
  D6 = 1174,
  Ds6 = 1244,
  E6 = 1318,
  F6 = 1396,
  Fs6 = 1479,
  G6 = 1567,
  Gs6 = 1661,
  A6 = 1760,
  As6 = 1864,
  B6 = 1975,
  C7 = 2093,
  Cs7 = 2217,
  D7 = 2349,
  Ds7 = 2489,
  E7 = 2637,
  F7 = 2794,
  Fs7 = 2959,
  G7 = 3136,
  Gs7 = 3322,
  A7 = 3520,
  As7 = 3729,
  B7 = 3951,
  C8 = 4186,
  Cs8 = 4435,
  D8 = 4699,
  Ds8 = 4978,
  E8 = 5274,
  F8 = 5587,
  Fs8 = 5919,
  G8 = 6271,
  Gs8 = 6644,
  A8 = 7040,
  As8 = 7458,
  B8 = 7902,
}

export function PitchToNote(pitch: number) {
  let note = Notes[pitch];
  return note.toString();
}

// Generates a valid UUID4 string
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
