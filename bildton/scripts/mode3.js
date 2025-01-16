let ind3;
var notes3 = 2;
var samples3 = [];
var hoverArr3 = [];
var loop3;
var loopInterval3 = 0.2;
var img3, layer3;
var dragInd3;

var ui3s, ui3v, ui3a;

function setup3() {
    img3 = createGraphics(sourceW, sourceH);
    layer3 = createGraphics(w, h);
    img3.colorMode(RGB, 255, 255, 255, 100);


    for (let i = 0; i < notes3; i++) {
        samples3[i] = new Sample3(random(randMarg, w - randMarg), random(randMarg, h - randMarg), i);
        samples3[i].getHue();
    }



    ui3s = document.getElementById("ui3s");
    ui3v = document.getElementById("ui3v");
    ui3a = document.getElementById("ui3a");

    // var loop3 = new p5.SoundLoop(onLoop3, loopInterval3);
    // loop3.start();

}

function ui3Show() {
    ui3s.style.display = "block";
    ui3v.style.display = "block";
    ui3a.style.display = "block";
}

function ui3Hide() {
    ui3s.style.display = "none";
    ui3v.style.display = "none";
    ui3a.style.display = "none";
}

function mode3() {
    img3.loadPixels();
    layer3.clear();
    capture.loadPixels();
    img3.image(capture, 0, 0);

    layer3.beginShape();
    for (let i = 0; i < samples3.length; i++) {
        layer3.noFill();
        layer3.stroke(colW);
        layer3.strokeWeight(strokeW);
        layer3.vertex(samples3[i].posX, samples3[i].posY);
    }
    layer3.endShape();

    if (this.img3) {
        for (let i = 0; i < samples3.length; i++) {
            samples3[i].getHue();
            samples3[i].play();
            samples3[i].anim(loopI);
            samples3[i].mOver(mouseX, mouseY);
        }
        if (dragInd3 !== undefined)
            samples3[dragInd3].move(mouseX, mouseY);
        for (let i = 0; i < samples3.length; i++) {
            samples3[i].show(mouseX, mouseY);
            samples3[i].txt();
            hoverArr3[i] = samples3[i].rollover;
        }
    }

    if (mode == 3) {
        if (hoverArr3.includes(true)) {
            cursor('grab');
        } else {
            cursor('auto');
        }
    }

}

class Sample3 {
    constructor(posX, posY, ind) {
        this.posX = constrain(posX, 0, w);
        this.posY = constrain(posY, 0, h);
        this.sz = szDot;
        this.dragging = false;
        this.rollover = false;
        this.clr;
        this.index = ind;
        this.note;
        this.ani = 0;
    }

    getHue() {
        this.xP = int(this.posX / sc);
        this.yP = int(this.posY / sc);
        this.indP = int(4 * ((this.yP * sourceW) + this.xP));
        this.r = img3.pixels[this.indP];
        this.g = img3.pixels[this.indP + 1];
        this.b = img3.pixels[this.indP + 2];
        this.clr = img3.color(this.r, this.g, this.b);
        this.hue = img3.hue(this.clr);
        this.harm = 0;
        layer3.fill(this.clr);
    }

    anim(ind) {
        this.aniSp = 0.35;
        if (this.index == ind) {
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
            dragInd3 = this.index;
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
        // console.log(this.ind, this.posX / sc, this.posY / sc);
        layer3.fill(this.clr);
        layer3.stroke(dotC);
        layer3.strokeWeight(strokeW);
        this.rad = this.sz / 2;
        layer3.rect(this.posX - this.rad, this.posY - this.rad, this.sz, this.sz);
    }


    txt() {
        this.fontSz = this.sz * 0.4;
        layer3.textAlign(CENTER);
        if (brightness(this.clr) < 50) {
            layer3.fill(colW);
        } else {
            layer3.fill(colB);
        }
        layer3.noStroke();
        layer3.textSize(this.fontSz);
        if (this.index == 0) {
            layer3.text(this.midiNote, this.posX, this.posY + (this.fontSz / 4));
        } else {
            layer3.text(nf(this.harm, 0, 2), this.posX, this.posY + (this.fontSz / 4));
        }
    }


    play() {
        this.note = map(this.hue, 0, 360, 0, 127);
        this.midiNote = int(pitch3 + (this.note / range3));
        this.freq = Tone.Frequency.mtof(int(this.midiNote));
        this.harm = this.midiNote / 127;
        if (this.index == 0) {
            synth3.set("frequency", this.freq);
        }
        else if (this.index == 1) {
            synth3.set("harmonicity", this.harm);
        }
    }

    randomize(x, y) {
        this.posX = x;
        this.posY = y;
    }


    pressed(tx, ty) {
        if (this.rollover) {
            this.dragging = true;
        }
    }

    released() {
        this.dragging = false;
    }

}

function sample3Pressed() {
    for (let i = 0; i < samples3.length; i++) {
        samples3[i].pressed(mouseX, mouseY);
    }
}

function sample3Released() {
    for (let i = 0; i < samples3.length; i++) {
        samples3[i].released();
    }
}

function resize3(sc) {
    layer3 = createGraphics(w, h);
}



function but3_1Evt(val) {
    for (let i = 0; i < notes3; i++) {
        samples3[i].randomize(random(randMarg, w - randMarg), random(randMarg, h - randMarg));
    }
}