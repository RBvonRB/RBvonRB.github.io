var pitch3 = 45;
var range3 = 3;
var chan3 = 3;
var decay3 = 0.01;
var velo3 = 0;
var loopC = 0;
var loopI = 0;
let playN;

var vol3tone = new Tone.Volume(volMin);
vol3tone.mute = true;

// var reverb3 = new Tone.Reverb({
//   decay: 2,
//   preDelay: 0.1
// });


// var delay3 = new Tone.FeedbackDelay({
//   delayTime: "8n",
//   feedback: .3,
//   wet: 0.5
// });

var lp3 = new Tone.Filter({
  frequency: 1000,
  type: "lowpass",
});


var hp3 = new Tone.Filter({
  frequency: 0,
  type: "highpass",
});

const synth3 = new Tone.FMOscillator({
  frequency: 200,
  type: "square",
  modulationType: "triangle",
  harmonicity: 0.2,
  modulationIndex: 3
  // partials: [1, 0.5, 0.1, 0.01]
}).start();

synth3.chain(vol3tone, lp3, hp3, Tone.Master)



function asel3_1Evt(val) {
  synth3.set("type", val);
}

function asl3_1Evt(val) {
  pitch3 = map(val, 0, 127, 30, 60);
  return pitch3;
}

function asl3_2Evt(val) {
  range3 = map(val, 0, 127, 60, 3);
  return range3;
}


function asl3_3Evt(val) {
  let lp3freq = map(val, 0, 127, 0, 1000);
  lp3.set("frequency", lp3freq);
}

function asl3_4Evt(val) {
  let hp3freq = map(val, 0, 127, 0, 1000);
  hp3.set("frequency", hp3freq);
}

function vol3Evt(val) {
  vol3 = map(val, 0, 127, volMin, -8);
  velo3 = map(val, 0, 127, 0, 1);
  vol3tone.set("volume", vol3);
  if (vol3 <= volMin) {
    vol3tone.mute = true;
  } else {
    vol3tone.mute = false;
  }
}

