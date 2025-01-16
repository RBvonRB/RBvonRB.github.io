
var samples1 = 12;
let thresh1 = .5;
var timeInt1 = 10;
var invert1 = false;
var img1, layer1;
var samplesArr1 = [];
var hoverArr1 = [];
var sample1isPressed = false;
var ui1s, ui1v, ui1a;
var shader1;
var dragInd1;

function preload1() {
  shader1 = loadShader('assets/shaders/threshold/effect.vert', 'assets/shaders/threshold/effect.frag');
}

function setup1() {
  img1 = createGraphics(sourceW, sourceH, WEBGL);
  layer1 = createGraphics(w, h);
  layer1.colorMode(HSB, 360, 100, 100, 100);



  for (let i = 0; i < samples1; i++) {
    samplesArr1[i] = new Sample1(random(randMarg, w - randMarg), random(randMarg, h - randMarg), i);
  }

  ui1s = document.getElementById("ui1s");
  ui1v = document.getElementById("ui1v");
  ui1a = document.getElementById("ui1a");
}

function ui1Show() {
  ui1s.style.display = "block";
  ui1v.style.display = "block";
  ui1a.style.display = "block";
}

function ui1Hide() {
  ui1s.style.display = "none";
  ui1v.style.display = "none";
  ui1a.style.display = "none";
}




function mode1() {

  layer1.clear();
  img1.loadPixels();
  img1.shader(shader1);
  shader1.setUniform('tex0', capture);
  shader1.setUniform('thresh1', thresh1);
  shader1.setUniform('invert', invert1);
  img1.rect(0, 0, img1.width, img1.height);


  for (let i = 0; i < samplesArr1.length; i++) {
    samplesArr1[i].brght();
    samplesArr1[i].anim();
    samplesArr1[i].mOver(mouseX, mouseY);
  }

  if (dragInd1 !== undefined)
    samplesArr1[dragInd1].move(mouseX, mouseY);

  for (let i = 0; i < samplesArr1.length; i++) {
    samplesArr1[i].show(mouseX, mouseY);
    samplesArr1[i].txt();
    samplesArr1[i].play();
    hoverArr1[i] = samplesArr1[i].rollover;
  }


  if (mode == 1) {
    if (hoverArr1.includes(true)) {
      cursor('grab');
    } else {
      cursor(CROSS);
    }
  }
}




class Sample1 {
  constructor(posX, posY, ind) {
    this.posX = posX;
    this.posY = posY;
    this.szSt = szDot;
    this.sz = this.szSt;
    this.strk = strokeW;
    this.dragging = false;
    this.rollover = false;
    this.isPlaying = false;
    this.trig = false;
    this.theta1 = 0;
    this.ani = 0;
    this.aniTr = false;
    this.ind = ind;
    this.note;
  }

  brght() {
    this.xP = int(this.posX / sc);
    this.yP = int(img1.height - (this.posY / sc));
    this.indP = int(4 * ((this.yP * sourceW) + this.xP));
    this.bright = img1.pixels[this.indP];
    if (this.bright > 0) {
      this.trig = true;
    } else {
      this.trig = false;
    }
  }

  anim() {
    this.aniSp = 0.35;
    if (this.trig) {
      if (this.ani < 1) {
        this.ani += this.aniSp;
      } else {
        this.ani = 1;
      }
    } else {
      if (this.ani > 0) {
        this.ani -= this.aniSp;
      } else {
        this.ani = 0;
      }
    }
  }

  mOver(tx, ty) {
    if (tx > this.posX - this.sz / 2 && tx < this.posX + this.sz / 2 && ty > this.posY - this.sz / 2 && ty < this.posY + this.sz / 2) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  move(tx, ty) {
    if (this.dragging) {
      this.posX = constrain(tx, 0, w);;
      this.posY = constrain(ty, 0, h);
    }
  }

  show(tx, ty) {
    layer1.colorMode(HSB, 360, 100, 100, 100);
    this.col = dotC;

    this.sz = this.szSt;
    this.echoSz = this.sz * (1 + this.ani * 0.6);
    layer1.stroke(hue(this.col), saturation(this.col) * this.ani, brightness(this.col));
    layer1.fill(0, 0, 100 * this.ani);
    layer1.strokeWeight(this.strk);
    layer1.rectMode(CENTER);
    layer1.rect(this.posX, this.posY, this.sz, this.sz);

  }


  txt() {
    this.fontSz = this.sz * 0.5;
    layer1.textAlign(CENTER);
    layer1.fill(0, 0, 100 * (1 - this.ani));
    layer1.noStroke();
    layer1.textSize(this.fontSz);
    if (this.note) {
      // if (midiOutput) {
      if (midiOutput && midiOutput.name == "USB MIDI Interface ")
        layer1.text(this.volcaNote, this.posX, this.posY + (this.fontSz / 4));
      else
        layer1.text(this.note, this.posX, this.posY + (this.fontSz / 4));
      // }
    }
  }


  randomize(randX1, randY1, randX2, randY2) {
    this.posX = random(randX1, randX2);
    this.posY = random(randY1, randY2);
  }



  pressed(tx, ty) {
    if (this.rollover) {
      dragInd1 = this.ind;
      this.dragging = true;
      sample1isPressed = true;
    }

  }

  released() {
    this.dragging = false;
    sample1isPressed = false;
  }

  play() {
    this.note = constrain(pitch1 + (this.ind * interval1), 0, 127);
    this.volcaNote = constrain(this.ind, 1, 10);
    this.chan = 1;
    if (this.trig) {
      if (!this.isPlaying) {
        synth1.triggerAttack(Tone.Frequency.mtof(this.note));
        if (midiOutput) {
          if (midiOutput.name == "loopMIDI Port") {
            midiOutput.playNote(this.note, this.chan, { velocity: velo1 });
            printMidiOut("noteOn", this.note, velo1, this.chan);
          } else if (midiOutput.name == "USB MIDI Interface ") {
            // if (mode == 1) {
            midiOutput.playNote(1, this.volcaNote)
            printMidiOut("noteOn", this.note, velo1, this.chan);
            // }
          }
        }
        this.isPlaying = true;
      }
    } else {
      if (this.isPlaying) {
        synth1.triggerRelease(Tone.Frequency.mtof(this.note));
        if (midiOutput) {
          midiOutput.stopNote(this.note, this.chan);
        }
        this.isPlaying = false;
      }
    }
  }
}

function sample1Pressed() {
  for (let i = 0; i < samplesArr1.length; i++) {
    samplesArr1[i].pressed(mouseX, mouseY);
  }
}

function sample1Released() {
  for (let i = 0; i < samplesArr1.length; i++) {
    samplesArr1[i].released();
  }
}


function resize1(sc) {
  layer1 = createGraphics(w, h);
  layer1.colorMode(HSB, 360, 100, 100, 100);
}

function tgl1_1Evt(val) {
  invert1 = val;
}

function but1_1Evt() {
  for (let i = 0; i < samplesArr1.length; i++) {
    samplesArr1[i].randomize(randMarg, randMarg, w - randMarg, h - randMarg);
  }
}

function sl1_1Evt(val) {
  thresh1 = map(val, 0, 127, 0, 1);
}
