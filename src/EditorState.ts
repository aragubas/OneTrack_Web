import { ref } from "vue";

export let Playing = ref(false);

let audioContext = new AudioContext();

function Sinewave(time: number, tone: number) {
  let sampleFreq = audioContext.sampleRate / tone;
  return Math.sin(time / ((sampleFreq / Math.PI) * 2));
}

export function StartPlayMode() {
  console.log("Start play mode");

  let audioBuffer = [];
  let duration = 1;

  for (let i = 0; i < audioContext.sampleRate * duration; i++) {
    audioBuffer[i] = Sinewave(i, 440) * 0.5;
  }

  Play(audioBuffer);
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
