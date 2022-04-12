import { Ref, ref } from "vue";

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

    for (let i3 = 0; i3 < 10; i3++) {
      let notes = Array<Note>();

      for (let i2 = 0; i2 < PatternLength.value; i2++) {
        notes.push(new Note(0, 0, "________", i2));
      }

      patterns.push(new Pattern(i3, notes));
    }

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
  C = 16,
  Cs = 17,
  D = 18,
  Ds = 19,
  E = 20,
  F = 21,
  Fs = 23,
  G = 24,
  Gs = 25,
  A = 27,
  As = 29,
  B = 0,
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

export function GetNoteByScale(note: Notes, scale: number): Notes {
  switch (note) {
    case Notes.C:
      switch (scale) {
        case 1:
          return Notes.C1;

        case 2:
          return Notes.C2;

        case 3:
          return Notes.C3;

        case 4:
          return Notes.C4;

        case 5:
          return Notes.C5;

        case 6:
          return Notes.C6;

        case 7:
          return Notes.C7;

        case 8:
          return Notes.C8;
      }

    case Notes.Cs:
      switch (scale) {
        case 1:
          return Notes.Cs1;

        case 2:
          return Notes.Cs2;

        case 3:
          return Notes.Cs3;

        case 4:
          return Notes.Cs4;

        case 5:
          return Notes.Cs5;

        case 6:
          return Notes.Cs6;

        case 7:
          return Notes.Cs7;

        case 8:
          return Notes.Cs8;
      }

    case Notes.D:
      switch (scale) {
        case 1:
          return Notes.D1;

        case 2:
          return Notes.D2;

        case 3:
          return Notes.D3;

        case 4:
          return Notes.D4;

        case 5:
          return Notes.D5;

        case 6:
          return Notes.D6;

        case 7:
          return Notes.D7;

        case 8:
          return Notes.D8;
      }

    case Notes.Ds:
      switch (scale) {
        case 1:
          return Notes.Ds1;

        case 2:
          return Notes.Ds2;

        case 3:
          return Notes.Ds3;

        case 4:
          return Notes.Ds4;

        case 5:
          return Notes.Ds5;

        case 6:
          return Notes.Ds6;

        case 7:
          return Notes.Ds7;

        case 8:
          return Notes.Ds8;
      }

    case Notes.E:
      switch (scale) {
        case 1:
          return Notes.E1;

        case 2:
          return Notes.E2;

        case 3:
          return Notes.E3;

        case 4:
          return Notes.E4;

        case 5:
          return Notes.E5;

        case 6:
          return Notes.E6;

        case 7:
          return Notes.E7;

        case 8:
          return Notes.E8;
      }

    case Notes.F:
      switch (scale) {
        case 1:
          return Notes.F1;

        case 2:
          return Notes.F2;

        case 3:
          return Notes.F3;

        case 4:
          return Notes.F4;

        case 5:
          return Notes.F5;

        case 6:
          return Notes.F6;

        case 7:
          return Notes.F7;

        case 8:
          return Notes.F8;
      }

    case Notes.Fs:
      switch (scale) {
        case 1:
          return Notes.Fs1;

        case 2:
          return Notes.Fs2;

        case 3:
          return Notes.Fs3;

        case 4:
          return Notes.Fs4;

        case 5:
          return Notes.Fs5;

        case 6:
          return Notes.Fs6;

        case 7:
          return Notes.Fs7;

        case 8:
          return Notes.Fs8;
      }

    case Notes.G:
      switch (scale) {
        case 1:
          return Notes.G1;

        case 2:
          return Notes.G2;

        case 3:
          return Notes.G3;

        case 4:
          return Notes.G4;

        case 5:
          return Notes.G5;

        case 6:
          return Notes.G6;

        case 7:
          return Notes.G7;

        case 8:
          return Notes.G8;
      }

    case Notes.Gs:
      switch (scale) {
        case 1:
          return Notes.Gs1;

        case 2:
          return Notes.Gs2;

        case 3:
          return Notes.Gs3;

        case 4:
          return Notes.Gs4;

        case 5:
          return Notes.Gs5;

        case 6:
          return Notes.Gs6;

        case 7:
          return Notes.Gs7;

        case 8:
          return Notes.Gs8;
      }

    case Notes.A:
      switch (scale) {
        case 1:
          return Notes.A1;

        case 2:
          return Notes.A2;

        case 3:
          return Notes.A3;

        case 4:
          return Notes.A4;

        case 5:
          return Notes.A5;

        case 6:
          return Notes.A6;

        case 7:
          return Notes.A7;

        case 8:
          return Notes.A8;
      }

    case Notes.As:
      switch (scale) {
        case 1:
          return Notes.As1;

        case 2:
          return Notes.As2;

        case 3:
          return Notes.As3;

        case 4:
          return Notes.As4;

        case 5:
          return Notes.As5;

        case 6:
          return Notes.As6;

        case 7:
          return Notes.As7;

        case 8:
          return Notes.As8;
      }

    case Notes.B:
      switch (scale) {
        case 1:
          return Notes.B1;

        case 2:
          return Notes.B2;

        case 3:
          return Notes.B3;

        case 4:
          return Notes.B4;

        case 5:
          return Notes.B5;

        case 6:
          return Notes.B6;

        case 7:
          return Notes.B7;

        case 8:
          return Notes.B8;
      }
  }

  return Notes.C;
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
