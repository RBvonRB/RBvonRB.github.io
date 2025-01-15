let font,
  fontsize = 20;
let txt = "raphaelbenz";
let counter = "_";

let columns = 16;
let posY = 35;
let indexPosXRaw = [];
let indexPosX = [];
let allIndex = [];
let allPos = [];
let mouseIndex;
let distX;
let mouseDistX;
let letterW = 20;
let letterH;
let margin = 2;
let activeLetter;
let hoverLetter;
let letterClick;

let stepCntRaw = 0;
let stepCnt = 0;
let pStepCnt;
let tempo = 0.1;

let tonName = [];
let sequence = [];
let notePlay = "";
let playLetterIndex;
let pPlayLetterIndex;

let mute = true;
let vol = 0;
let muteHover = false;
let muteIcon, volIcon, icon;


function preload() {
  font = loadFont("assets/fonts/universRom.otf");
  tonName = [
    loadSound("assets/audio/ton1.WAV"),
    loadSound("assets/audio/ton2.WAV"),
    loadSound("assets/audio/ton3.WAV"),
    loadSound("assets/audio/ton4.WAV"),
    loadSound("assets/audio/ton5.WAV")
  ];

  muteIcon = loadImage("assets/mute.svg");
  volIcon = loadImage("assets/sound.svg");
}

function setup() {
  let cnv = createCanvas(windowWidth, 150);
  cnv.parent("wortmarke");
  textFont(font);
  textSize(fontsize);
  letterClick = true;


  distX = width / columns;
  letterH = fontsize * 0.8;

  for (let i = 1; i < columns; i++) {
    allIndex[i] = i;
  }

  for (let i = 0; i < columns; i++) {
    allPos[i] = i;
  }
  for (let i = 0; i < txt.length; i++) {
    let rand = floor(random(allPos.length));
    let remove = allPos.splice(rand, 1);
    indexPosXRaw.push(remove);
  }

  indexPosXRaw.sort(compareNumbers);
  indexPosXRaw[0] = 0;
  indexPosXRaw[txt.length - 1] = columns - 1;
  indexPosX = indexPosXRaw.map(Number);

  //fill sequencer
  for (let i = 0; i < txt.length; i++) {
    if (i === 0) {
      sequence[i] = tonName[0];
    } else {
      sequence[i] = tonName[floor(random(tonName.length))];
    }
  }

  icon = muteIcon;

}

function draw() {
  background(255);

  pStepCnt = stepCnt;
  stepCntRaw += tempo;
  stepCnt = floor(stepCntRaw) % columns;

  mouseIndex = floor(map(constrain(mouseX, 0, width), 0, width, 0, columns));
  if (mouseIndex >= columns - 1) {
    mouseIndex = columns - 1;
  }


  for (let i = 0; i < tonName.length; i++) {
    tonName[i].setVolume(vol);
  }

  pPlayLetterIndex = playLetterIndex;
  if (stepCnt != pStepCnt) {
    for (let i = 0; i < columns; i++) {
      if (stepCnt === indexPosX[i]) {
        playLetterIndex = i;
        if (playLetterIndex >= 0) {
          notePlay = sequence[playLetterIndex];
          if (notePlay) {
            notePlay.play();
          }
        }
      }
    }
  }


  for (let i = 0; i < columns; i++) {
    if (indexPosX[i] === mouseIndex) {
      hoverLetter = i;
    }
  }

  //mouseover
  if (
    mouseX > indexPosX[hoverLetter] * distX - margin &&
    mouseX <= indexPosX[hoverLetter] * distX + letterW + margin &&
    mouseY > posY - letterH - margin &&
    mouseY <= posY + margin
  ) {
    cursor("grab");
  } else if (mouseX > 0 && mouseX < 20 && mouseY > posY - 40 && mouseY < posY - 20) {
    cursor("pointer");
    muteHover = true;
  } else {
    muteHover = false;
    cursor("default");
  }


  textAlign(LEFT);
  noStroke();
  for (let x = 0; x < txt.length; x++) {
    if (
      pPlayLetterIndex &&
      pPlayLetterIndex !== playLetterIndex &&
      playLetterIndex === x
    ) {
      //fill(0, 0);
    } else {
      fill(0);
    }
    letters(x);
  }

  //counter
  if (!mute)
    text(counter, stepCnt * distX, posY + 10);

  image(icon, 0, posY - 40, 20, 20);
}


function compareNumbers(a, b) {
  return a - b;
}

function letters(x) {
  text(txt.charAt(x), indexPosX[x] * distX, posY);
}

function mousePressed() {
  for (let i = 0; i < columns; i++) {
    if (indexPosX[i] === mouseIndex) {
      activeLetter = i;
    }
  }

  if (
    mouseX > indexPosX[activeLetter] * distX - margin &&
    mouseX <= indexPosX[activeLetter] * distX + letterW + margin &&
    mouseY > posY - letterH - margin &&
    mouseY <= posY + margin
  ) {
    letterClick = true;
  } else {
    letterClick = false;
  }

  if (muteHover) {
    mute = !mute;
    muteTgl(mute);
  }
}

function mouseReleased() {
  letterClick = false;
}

function mouseDragged() {
  if (letterClick === true) {
    if (indexPosX[activeLetter - 1] !== mouseIndex) {
      indexPosX[activeLetter] = mouseIndex;
    }
    if (mouseIndex <= indexPosX[activeLetter - 1]) {
      indexPosX[activeLetter] = +indexPosX[activeLetter - 1] + 1;
    } else if (mouseIndex >= indexPosX[activeLetter + 1]) {
      indexPosX[activeLetter] = indexPosX[activeLetter + 1] - 1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, height);
}

function keyPressed() {
  if (key == 'm') {
    mute = !mute;
  }
  muteTgl(mute);
}

function muteTgl(val) {
  if (!val) {
    vol = 1;
    icon = volIcon;
  } else {
    vol = 0;
    icon = muteIcon;
  }
}