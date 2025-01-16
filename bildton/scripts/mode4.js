// https://kylemcdonald.github.io/cv-examples/
// https://inspirit.github.io/jsfeat/sample_canny_edge.html

var buffer;
var result;
var lowThreshold4 = 100;
var highThreshold4 = 200;
var blurSize4 = 4;
var speed4 = 1;
var img4, layer4;
let sample4 = [];
var numSamples4 = 8;


var ui4s, ui4v, ui4a;

function setup4() {
    buffer = new jsfeat.matrix_t(sourceW, sourceH, jsfeat.U8C1_t);


    for (let i = 0; i < numSamples4; i++) {
        sample4[i] = new Sample4(random(w), random(h), i, int(random(4)), (i * 0.25) + 4);
    }

    img4 = createGraphics(sourceW, sourceH);
    layer4 = createGraphics(w, h);

    ui4s = document.getElementById("ui4s");
    ui4v = document.getElementById("ui4v");
    ui4a = document.getElementById("ui4a");
}

function ui4Show() {
    ui4s.style.display = "block";
    ui4v.style.display = "block";
    ui4a.style.display = "block";
}

function ui4Hide() {
    ui4s.style.display = "none";
    ui4v.style.display = "none";
    ui4a.style.display = "none";
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}

function mode4() {
    capture.loadPixels();
    img4.loadPixels();
    jsfeat.imgproc.grayscale(capture.pixels, sourceW, sourceH, buffer);
    jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize4, 0);
    jsfeat.imgproc.canny(buffer, buffer, lowThreshold4, highThreshold4);
    var n = buffer.rows * buffer.cols;
    result = jsfeatToP5(buffer, result);
    img4.image(result, 0, 0);

    layer4.clear();

    sample4.forEach(sample4 => {
        sample4.move();
        sample4.display();
        sample4.play();
        sample4.txt();
    });

    if (mode == 4)
        cursor('auto');
}

function resize4(sc) {
    layer4 = createGraphics(w, h);
}


class Sample4 {
    constructor(x, y, ind, dir, sp) {
        this.x = x;
        this.y = y;
        this.i = ind;
        this.dir = dir;
        this.sp = sp;
        this.trig = false;
        this.ani = 0;
        this.strk = strokeW;
        this.sz = szDot;
        this.note;
        this.hit = 0;
    }

    move() {
        if (this.dir == 0) {
            this.x += this.sp;
        } else if (this.dir == 1) {
            this.y += this.sp;
        } else if (this.dir == 2) {
            this.x -= this.sp;
        } else if (this.dir == 3) {
            this.y -= this.sp;
        }
        if (this.x > w) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = w;
        }
        if (this.y > h) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = h;
        }

        this.xP = int(this.x / sc);
        this.yP = int(this.y / sc);
        this.indP = int(4 * ((this.yP * sourceW) + this.xP));
        this.bright = img4.pixels[this.indP];
        if (this.bright > 0) {
            this.trig = true;
        } else {
            this.trig = false;
        }
    }


    display() {
        layer4.colorMode(HSB, 360, 100, 100, 100);
        this.col = dotC;
        if (this.trig) {
            layer4.stroke(this.col);
            layer4.fill(colW);
        }
        else {
            layer4.stroke(colW);
            layer4.fill(colB);
        }
        layer4.strokeWeight(this.strk);
        layer4.rectMode(CENTER);
        layer4.rect(this.x, this.y, this.sz, this.sz);
    }


    txt() {
        this.fontSz = this.sz * 0.5;
        layer4.textAlign(CENTER);
        if (this.trig)
            layer4.fill(colB);
        else
            layer4.fill(colW);
        layer4.noStroke();
        layer4.textSize(this.fontSz);
        if (this.note) {
            layer4.text(this.note, this.x, this.y + (this.fontSz / 4));
        }
    }


    randomize(rX, rY) {
        this.x = random(rX);
        this.y = random(rY);
    }



    play() {
        this.note = constrain(pitch4 + (this.i * interval4), 0, 127);
        this.volcaNote = constrain(this.i, 0, 9);
        this.chan = 4;
        if (this.bright > 0) {
            synth4.triggerAttackRelease(Tone.Frequency.mtof(this.note), decay4);
            if (midiOutput) {
                if (midiOutput.name != "USB MIDI Interface ") {
                    midiOutput.playNote(this.note, this.chan, { duration: decay4 * 1000, velocity: velo4 });
                    printMidiOut("noteOn", this.note, velo4, this.chan);
                    // } else {
                    // if (mode == 4) {
                    // midiOutput.playNote(1, this.volcaNote)
                    // printMidiOut("noteOn", this.volcaNote, velo4, this.chan);
                    // }
                }
            }
        }
    }
}



function but4_1Evt() {
    sample4.forEach(sample4 => {
        sample4.randomize(w, h);
    });
}

function sl4_1Evt(val) {
    blurSize4 = map(val, 0, 127, 1, 12);
}
function sl4_2Evt(val) {
    lowThreshold4 = map(val, 0, 127, 0, 255);
}

function sl4_3Evt(val) {
    highThreshold4 = map(val, 0, 127, 0, 255);
}