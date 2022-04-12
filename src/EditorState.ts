import { ref } from "vue";
import {
  ChannelNeedlePosition,
  Channels,
  MatrixPosition,
  PatternLength,
  PatternMatrix,
} from "./SongData";

export let Playing = ref(false);

let audioContext = new AudioContext();
let mixerIntervalID = 0;

function Sinewave(time: number, tone: number) {
  let sampleFreq = audioContext.sampleRate / tone;
  return Math.sin(time / ((sampleFreq / Math.PI) * 2));
}

export function StopPlayMode() {
  clearInterval(mixerIntervalID);
  Playing.value = false;
}

export function StartPlayMode() {
  Playing.value = true;

  let BPM = 20;

  mixerIntervalID = setInterval(() => {
    console.log("Mixer");
    // Playing.value = false;

    for (let i = 0; i < 2; i++) {
      let patternMatrixLine =
        PatternMatrix.value[MatrixPosition.value].Pattern[i].Pattern;

      let currentChannel = Channels.value[i].Patterns[patternMatrixLine];

      let currentNote = currentChannel.Notes[ChannelNeedlePosition.value];

      console.log(currentNote);
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
  }, (60 / BPM) * 100);

  // let audioBuffer = [];
  // let duration = 1;

  // for (let i = 0; i < audioContext.sampleRate * duration; i++) {
  //   audioBuffer[i] = Sinewave(i, 440) * 0.5;
  // }

  // Play(audioBuffer);
}

export function Play(array: Array<number>) {
  var fBuffer = new Float32Array(array);
  for (let i = 0; i < array.length; i++) {
    fBuffer[i] = array[i];
  }

  var buffer = audioContext.createBuffer(
    1,
    fBuffer.length,
    audioContext.sampleRate
  );
  buffer.copyToChannel(fBuffer, 0);

  var source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}
