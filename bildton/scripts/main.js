var capture;
var mode = 1;
var webcam = false;
var startVid = 'wolken';
var videos = [
    'autos',
    'autos2',
    'baustelle',
    'blaetter',
    'fahne',
    'fahrt1',
    'fahrt2',
    'gras',
    'hammer',
    'liege',
    'stadt',
    'stadt2',
    'sunset',
    'tauben',
    'voegel',
    'voegel2',
    'wasser',
    'wasser2',
    'wolken',
    'webcam'
];
var folder = 'assets/videos/cut/';
var w = 640;
var h = 360;
var fps = 20;
var mouseOnCanv = false;
var mouseOnTime = false;
var mouseOnLoop = false;
var szDot = 45;
var scDot = 1.5;
var strokeW = 5;
var strokeUI = 2;
var fontSz = 28;
var dotC, dotC2, colW, colW2, colB, colB2, colMain;
var dropzone;
var thumbs = true;
var sourceW = 640;
var sourceH = 360;
var sc;
var minW = 640;
var wRatio = 1;
var showSource = true;
var showLayer = true;
var cell = 20;
var spd = 1;
var intro = true;
var introEl, uiEl, dropEl, contrEl, canvEl, muteEl;
var thumbnails = [];
var mXin, mYin, mXout, mYout;
var modeMode = false;
var drawRect = false;
var looper = true;
var controls = true;
var workBold;
var randMarg = 200;


function windowResized() {
    if (windowWidth >= minW) {
        w = int(windowWidth * wRatio);
        h = int(w / 16 * 9);
        resizeCanvas(w, windowHeight);
        resizeUI(sc);
        resize1(sc);
        resize2(sc);
        resize3(sc);
        resize4(sc);

        layer1.textFont(workBold);
        layer1.textSize(fontSz);

        layer2.textFont(workBold);
        layer2.textSize(fontSz);

        layer3.textFont(workBold);
        layer3.textSize(fontSz);

        layer4.textFont(workBold);
        layer4.textSize(fontSz);
    }
}

function preload() {
    preload1();
    workBold = loadFont('assets/fonts/WorkSans-Bold.ttf');
}

function setup() {
    cnv = createCanvas(w, windowHeight);
    cnv.mousePressed(cnvPressed);
    cnv.id('canvas');
    background(0);
    w = int(windowWidth * wRatio);
    h = int(w / 16 * 9);
    frameRate(fps);
    pixelDensity(1);
    sc = width / sourceW;


    introEl = document.getElementById("introCon");
    uiEl = document.getElementById("UI");
    dropEl = document.getElementById("dropzone");
    contrEl = document.getElementsByClassName("dragCon");
    canvEl = document.getElementById("canvas");
    muteEl = document.getElementById("muteCheck");


    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(videoDropped, unhighlight);


    setupOSCscript();

    setupUI();
    setup1();
    setup2();
    setup3();
    setup4();

    modeChange(1);
    windowResized();
    loadThumbnail();

    volEvent(60);


    layer1.textFont(workBold);
    layer1.textSize(fontSz);

    layer2.textFont(workBold);
    layer2.textSize(fontSz);

    layer3.textFont(workBold);
    layer3.textSize(fontSz);

    layer4.textFont(workBold);
    layer4.textSize(fontSz);



    looperIn = 0.25;
    looperOut = 0.3;

    colorMode(HSB, 360, 100, 100, 100);
    dotC = color(164, 100, 100);
    colW = color('#ffffff');
    colW2 = color('#e2e2e2');
    colB = color('#000000');
    colB2 = color('#242424');

}

function draw() {

    if (intro || thumbs) {
        modeMode = false;
    }
    clear();
    sc = width / sourceW;

    if (capture) {
        mode1();
        mode2();
        mode3();
        mode4();
        if (modeMode) {
            if (mode == 1) {
                if (showSource)
                    image(img1, 0, 0, w, h);
                if (showLayer)
                    image(layer1, 0, 0);
            } else if (mode == 2) {
                if (showSource)
                    image(img2, 0, 0, w, h);
                if (showLayer)
                    image(layer2, 0, 0);
            } else if (mode == 3) {
                if (showSource)
                    image(img3, 0, 0, w, h);
                if (showLayer)
                    image(layer3, 0, 0);
            } else if (mode == 4) {
                if (showSource)
                    image(img4, 0, 0, w, h);
                if (showLayer)
                    image(layer4, 0, 0);
            }

            image(rectLayer, 0, 0);
            if (controls)
                drawTime();


            if (looper && !webcam) {
                if (capture.time() / capture.duration() > looperOut || capture.time() / capture.duration() < looperIn)
                    capture.time(looperIn * capture.duration());
            }
        }
    }

}

function playEvent() {
    pause = !pause;
    if (pause) {
        capture.pause();
    } else {
        capture.loop();
    }
}


function spdEvt(val) {
    spd = map(val, 0, 127, 0, 5, true);
    capture.speed(spd);
}


function sourceEvent(val) {
    showSource = val;
}

function layerEvent(val) {
    showLayer = val;
}

function thumbEvt(val) {
    thumbs = true;
    muteEvent(false);
    muteEl.checked = false;
    showThumbnail();
    showdnd();
    uiEl.style.display = "none";
}

function loopEvent(val) {
    looper = val;
}


function modeChange(val) {

    mode = val;
    if (mode == 1) {
        ui1Show();
        document.getElementById("vol1").value = 127;
        document.getElementById("vol1").oninput();
    } else {
        ui1Hide();
    }
    if (mode == 2) {
        ui2Show();
        document.getElementById("vol2").value = 127;
        document.getElementById("vol2").oninput();
    } else {
        ui2Hide();
    }
    if (mode == 3) {
        ui3Show();
        document.getElementById("vol3").value = 127;
        document.getElementById("vol3").oninput();
    } else {
        ui3Hide();
    }
    if (mode == 4) {
        ui4Show();
        document.getElementById("vol4").value = 127;
        document.getElementById("vol4").oninput();
    } else {
        ui4Hide();
    }

}


function videoSelect(val) {
    startLoad();
    if (capture)
        capture.remove();

    if (val == 'webcam') {

        webcam = true;

        let constraints = {
            video: {
                mandatory: {
                    maxWidth: sourceW,
                    maxHeight: sourceH
                },
                optional: [
                    { maxFrameRate: fps }
                ]
            },
            audio: false
        };
        capture = createCapture(constraints, function () {
            capture.size(sourceW, sourceH);
            videoSelected();
            modeMode = true;
            capture.hide();
            stopLoad();
        });

    } else {
        webcam = false;
        let item = val;
        capture = createVideo([folder + item + '.mp4'], vidLoad);
    }
}

function vidLoad() {
    stopLoad();
    capture.size(sourceW, sourceH);
    capture.loop();
    capture.volume(0);
    capture.speed(spd);
    capture.hide();
    modeMode = true;
    videoSelected();
}


function showdnd() {
    dropEl.style.display = "block";
}

function hidednd() {
    dropEl.style.display = "none";
}

function highlight() {
    dropEl.style.backgroundColor = "var(--colBHover)";
}

function unhighlight() {
    dropEl.style.backgroundColor = "var(--colB)";
}

function videoDropped(file) {
    if (capture)
        capture.remove();
    webcam = false;
    capture = createVideo([file.data], vidLoad);
    capture.size(sourceW, sourceH);
    capture.hide();
    videoSelected();
}

function videoSelected() {
    thumbs = false;
    muteEl.checked = true;
    muteEvent(true);
    hideThumbnail();
    unhighlight();
    hidednd();
    if (controls)
        uiEl.style.display = "block";
}


function mousePressed() {

    if (mouseY >= (height - cell) && mouseY < height && mouseX > cell * 2 && mouseX < width) {
        mouseOnTime = true;
    }

    if (mouseY >= (height - cell * 2) && mouseY < height - cell && mouseX > cell * 2 && mouseX < width) {
        mouseOnLoop = true;
    }


    if (mouseOnLoop) {
        looperIn = constrain((mouseX - 2 * cell) / timeLayer.width, 0, 1);
    }

    if (mouseOnTime) {
        if (!webcam)
            capture.time(((mouseX - 2 * cell) / timeLayer.width) * capture.duration());
    }

    if (mouseOnCanv) {
        if (modeMode) {
            if (mode == 1) {
                sample1Pressed();
                if (!sample1isPressed) {
                    drawRect = true;
                    mXin = constrain(mouseX, 0, w);
                    mYin = constrain(mouseY, 0, h);
                }
            } else if (mode == 3) {
                sample3Pressed();
            }
        }
    }
}

function mouseReleased() {
    if (mouseOnLoop) {
        looperOut = constrain((mouseX - 2 * cell) / timeLayer.width, 0, 1);
    }


    if (looperOut < looperIn) {
        var looperInP = looperIn;
        looperIn = looperOut;
        looperOut = looperInP;
    }

    if (mode == 1) {
        sample1Released();
    } else if (mode == 3) {
        sample3Released();
    }

    if (mouseOnCanv && modeMode) {

        mXout = constrain(mouseX, 0, w);
        mYout = constrain(mouseY, 0, h);
        let dX = abs(mXin - mXout);
        let dY = abs(mYin - mYout);
        let thr = 20;
        if (dX < thr && dY < thr) {
            drawRect = false;
        }
        if (drawRect) {
            if (mode == 1) {
                for (let i = 0; i < samplesArr1.length; i++) {
                    samplesArr1[i].randomize(mXin, mYin, mXout, mYout);
                }
            }
            drawRect = false;
        }
        rectLayer.clear();


    }

    mouseOnCanv = false;
    mouseOnTime = false;
    mouseOnLoop = false;
}

function mouseDragged() {
    if (mouseOnLoop) {
        looperOut = constrain((mouseX - 2 * cell) / timeLayer.width, 0, 1);
    }
    if (!webcam && mouseOnTime) {
        capture.time(((mouseX - 2 * cell) / timeLayer.width) * capture.duration());
    }

    if (mouseOnCanv && modeMode && drawRect) {
        mXout = constrain(mouseX, 0, w);
        mYout = constrain(mouseY, 0, h);
        if (mode == 1) {
            mode1Drag();
        }
    }
}


function keyPressed() {
    if (key == ' ') {
        playEvent();
    }

    if (key == 'q') {
        controls = !controls;
        toggleUI(controls);
    }

    if (key == 's') {
        saveSettings();
    }

    if (keyCode === ENTER) {
        if (intro) {
            startEvt();
        }
    }
}

function saveSettings() {
    var inputs;
    inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].id, inputs[i].value);
    }

    for (let i = 0; i < samplesArr1.length; i++) {
        console.log("samples1: " + i + " posX " + samplesArr1[i].posX / sc + " posY: " + samplesArr1[i].posY / sc);
    }
    for (let i = 0; i < samples3.length; i++) {
        console.log("samples3: " + i + " posX " + samples3[i].posX / sc + " posY: " + samples3[i].posY / sc);
    }
    for (let i = 0; i < sample4.length; i++) {
        console.log("samples4: " + i + " posX " + sample4[i].x / sc + " posY: " + sample4[i].y / sc);
    }
    console.log("looperIn: " + looperIn + " looperOut: " + looperOut);
}

function toggleUI(bool) {
    if (bool)
        uiEl.style.display = 'block';
    else
        uiEl.style.display = 'none';
}

function startEvt() {
    userStartAudio();
    intro = false;
    introEl.style.display = "none";
    showdnd();
}

function helpEvt() {
    // intro = true;
    introEl.style.display = "block";
    hidednd();
}

function startLoad() {
    document.body.style.cursor = "progress";
}


function stopLoad() {
    document.body.style.cursor = "auto";
}

function cnvPressed() {
    mouseOnCanv = true;
}

function presetEvt(val) {
}

function mode1Drag() {
    rectLayer.colorMode(HSB);
    rectLayer.clear();
    rectLayer.rectMode(CORNERS);
    rectLayer.noFill();
    rectLayer.stroke(dotC);
    rectLayer.strokeWeight(strokeW);
    rectLayer.rect(mXin, mYin, mXout, mYout);
}
