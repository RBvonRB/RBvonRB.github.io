var filterFreq2 = 0;
var filterMin2 = 200;
var filterMax2 = 2000;
var pitch2 = 20;
var velo2 = 0;
var vol2;

var vol2tone = new Tone.Volume(0);
vol2tone.mute = true;

var delay2 = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: .3,
  wet: 0.5
});

var filter2 = new Tone.Filter({
  frequency: 300,
  type: "lowpass",
});

var hp2 = new Tone.Filter({
  frequency: 0,
  type: "highpass",
});

var noise2 = new Tone.Noise("pink").start();
var osc2 = new Tone.Oscillator({
  type: 'square',
  frequency: Tone.Frequency.mtof(pitch2),
  // partials: [1, 0.5, 0.1, 0.01]
  partials: [1, 0.5, 0.1, 0.01]
}).start();


//connect the noise
// noise2.chain(vol2tone, hp2, filter2, delay2, Tone.Master)
osc2.chain(vol2tone, hp2, filter2, delay2, Tone.Master);



function setFilter2() {
  if (flowLength > 0) {
    filterFreq2 = map(sum2, 0, flowLength, filterMin2, filterMax2);
  }
  filter2.set("frequency", filterFreq2);
}




function vol2Evt(val) {
  vol2 = map(val, 0, 127, volMin, 0);
  velo2 = map(val, 0, 127, 0, 1);
  vol2tone.set("volume", vol2);
  if (vol2 <= volMin) {
    vol2tone.mute = true;
  } else {
    vol2tone.mute = false;
  }
}

function asel2_1Evt(val) {
  if (val == "noise") {
    osc2.disconnect();
    noise2.chain(vol2tone, hp2, filter2, delay2, Tone.Master);
  } else {
    osc2.type = val;
    // console.log(osc2.type);
    osc2.chain(vol2tone, hp2, filter2, delay2, Tone.Master);
    noise2.disconnect();
  }
}


function asl2_1Evt(val) {
  pitch2 = map(val, 0, 127, 20, 40);
  osc2.set("frequency", Tone.Frequency.mtof(int(pitch2)));
  // console.log(osc2.frequency);
}

function asl2_2Evt(val) {
  let hp2freq = map(val, 0, 127, 0, 500);
  hp2.set("frequency", hp2freq);
}


function asl2_3Evt(val) {
  delay2.set("wet", map(val, 0, 127, 0, 1));
}

