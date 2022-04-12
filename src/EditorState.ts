import { ref } from "vue";
import {
  ChannelNeedlePosition,
  Channels,
  MatrixPosition,
  PatternLength,
  PatternMatrix,
} from "./SongData";

export let Playing = ref(false);

let audioContext: AudioContext | undefined = undefined;

let mixerIntervalID = 0;

function Sinewave(time: number, tone: number) {
  let sampleFreq = audioContext!.sampleRate / tone;
  return Math.sin(time / ((sampleFreq / Math.PI) * 2));
}

export function StopPlayMode() {
  clearInterval(mixerIntervalID);
  Playing.value = false;
}

class ToneGenerator {
  lastNote: number;
  bufferSource: AudioBufferSourceNode;

  constructor() {
    this.lastNote = 0;
  }

  Play(pitch: number) {
    if (this.lastNote != pitch && pitch != 0) {
      this.lastNote = pitch;

      // Not a stop note
      if (pitch != -1) {
        // Generates new buffer
        let duration = 1;
        let frames = audioContext!.sampleRate * duration;
        let audioBuffer = new Float32Array(frames);

        for (let i = 0; i < frames; i++) {
          audioBuffer[i] = Sinewave(i, pitch) * 0.5;
        }
        
        
        const newBuffer = audioContext!.createBuffer(1, frames, audioContext!.sampleRate);
        newBuffer.copyToChannel(audioBuffer, 0);

        // Stops the last buffer
        this.bufferSource?.stop();
        // console.log("ceira")

        this.bufferSource = new AudioBufferSourceNode(audioContext!);

        this.bufferSource.buffer = newBuffer; 
        this.bufferSource.loop = true;
        this.bufferSource.connect(audioContext!.destination);
        this.bufferSource.start();
    
        // this.bufferSource.buffer?.copyToChannel(audioBuffer, 0);


        // this.bufferSource.buffer?.copyToChannel(new Float32Array(audioBuffer), 0);
        // if (!this.bufferSource.buffer)
        // {
        //   this.bufferSource.buffer = this.buffer;
        // }
                

      } else
      {
        this.bufferSource!.stop();
      }


    }
  }
}

export function StartPlayMode() {
  if (audioContext == undefined) {
    audioContext = new AudioContext();
  }
  Playing.value = true;

  let BPM = 126;

  const tone = new ToneGenerator();

  mixerIntervalID = setInterval(() => {
    // Playing.value = false;

    for (let i = 0; i < 1; i++) {
      let patternMatrixLine =
        PatternMatrix.value[MatrixPosition.value].Pattern[i].Pattern;

      let currentChannel = Channels.value[i].Patterns[patternMatrixLine];

      let currentNote = currentChannel.Notes[ChannelNeedlePosition.value];

      tone.Play(currentNote.pitch);

      // Play(audioBuffer);
    }

    ChannelNeedlePosition.value++;

    if (ChannelNeedlePosition.value > PatternLength.value - 1) {
      ChannelNeedlePosition.value = 0;
      MatrixPosition.value++;

      if (MatrixPosition.value > PatternMatrix.value.length - 1) {
        MatrixPosition.value = 0;
        StopPlayMode();
      }
    }
  }, (60 / BPM) * 1000);
}

export function Play(array: Array<number>) {
  var fBuffer = new Float32Array(array);
  for (let i = 0; i < array.length; i++) {
    fBuffer[i] = array[i];
  }

  var buffer = audioContext!.createBuffer(
    1,
    fBuffer.length,
    audioContext!.sampleRate
  );
  buffer.copyToChannel(fBuffer, 0);

  var source = audioContext!.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext!.destination);
  source.start();
}
