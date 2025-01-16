var modeRadioEl = document.getElementById("modeRadio");

var pos1 = [
    279.4044, 362.8826,
    413.5795, 139.1304,
    290.4586, 157.427,
    348.3978, 144.4669,
    186.0154, 204.312,
    237.8557, 312.1858,
    370.8874, 176.1048,
    157.8082, 176.486,
    219.6666, 158.6666,
    419.3333, 170,
    14.66666, 232,
    267.6666, 184.6666
]


var pos3 = [324.4, 259.2,
    180.0, 97.2];

function presetEvt(val) {
    if (val == "preset1") {
        modeRadioEl.mode.value = 1;
        modeRadioEl.onchange();
        document.getElementById("vol1").value = 127;
        document.getElementById("vol1").oninput();
        document.getElementById("vol2").value = 0;
        document.getElementById("vol2").oninput();
        document.getElementById("vol3").value = 0;
        document.getElementById("vol3").oninput();
        document.getElementById("vol4").value = 0;
        document.getElementById("vol4").oninput();
        videoSelect('autos2');
        document.getElementById("loopCheck").checked = true;
        loopEvent(true);
        tgl1_1Evt(true);
        document.getElementById("tgl1_1").checked = true;
        document.getElementById("sl1_1").value = 71;
        document.getElementById("sl1_1").oninput();

        for (let i = 0; i < samplesArr1.length; i++) {
            samplesArr1[i].posX = pos1[i * 2] * sc;
            samplesArr1[i].posY = pos1[i * 2 + 1] * sc;
        }
        looperIn = 0.4685784014643075;
        looperOut = 0.5186089078706528;
        document.getElementById("asl1_1").value = 39;
        document.getElementById("asl1_1").oninput();
        document.getElementById("asl1_2").value = 59;
        document.getElementById("asl1_2").oninput();
        document.getElementById("asl1_3").value = 77;
        document.getElementById("asl1_3").oninput();
        document.getElementById("asl1_4").value = 127;
        document.getElementById("asl1_4").oninput();
    } else if (val == "preset2") {
        modeRadioEl.mode.value = 2;
        modeRadioEl.onchange();
        document.getElementById("vol1").value = 0;
        document.getElementById("vol1").oninput();
        document.getElementById("vol2").value = 127;
        document.getElementById("vol2").oninput();
        document.getElementById("vol3").value = 0;
        document.getElementById("vol3").oninput();
        document.getElementById("vol4").value = 0;
        document.getElementById("vol4").oninput();
        videoSelect('webcam');
        // loopEvent(true);
        // document.getElementById("loopCheck").checked = true;
        samplesArr1[0].posX = 442.333 * sc;
        samplesArr1[0].posY = 45.3333 * sc;
        document.getElementById("asel2_1").value = 'square';
        document.getElementById("asel2_1").onchange();
        document.getElementById("sl2_1").value = 22;
        document.getElementById("sl2_1").oninput();
        document.getElementById("asl2_1").value = 23;
        document.getElementById("asl2_1").oninput();
        document.getElementById("asl2_2").value = 0;
        document.getElementById("asl2_2").oninput();
        document.getElementById("asl2_3").value = 85;
        document.getElementById("asl2_3").oninput();
        looperIn = 0.36117021276595745;
        looperOut = 0.4053191489361702;
    } else if (val == "preset3") {
        modeRadioEl.mode.value = 3;
        modeRadioEl.onchange();
        document.getElementById("vol1").value = 0;
        document.getElementById("vol1").oninput();
        document.getElementById("vol2").value = 0;
        document.getElementById("vol2").oninput();
        document.getElementById("vol3").value = 127;
        document.getElementById("vol3").oninput();
        document.getElementById("vol4").value = 0;
        document.getElementById("vol4").oninput();
        videoSelect('fahne');
        document.getElementById("asel3_1").value = 'square';
        document.getElementById("asel3_1").onchange();
        document.getElementById("asl3_1").value = 34;
        document.getElementById("asl3_1").oninput();
        document.getElementById("asl3_3").value = 127;
        document.getElementById("asl3_3").oninput();
        document.getElementById("asl3_4").value = 0;
        document.getElementById("asl3_4").oninput();


        for (let i = 0; i < samples3.length; i++) {
            samples3[i].posX = pos3[i * 2] * sc;
            samples3[i].posY = pos3[i * 2 + 1] * sc;
        }
        looperIn = 0.6748;
        looperOut = 0.7169;

        loopEvent(true);
        document.getElementById("loopCheck").checked = true;
    } else if (val == "preset4") {
        modeRadioEl.mode.value = 4;
        modeRadioEl.onchange();
        document.getElementById("vol1").value = 0;
        document.getElementById("vol1").oninput();
        document.getElementById("vol2").value = 0;
        document.getElementById("vol2").oninput();
        document.getElementById("vol3").value = 0;
        document.getElementById("vol3").oninput();
        document.getElementById("vol4").value = 127;
        document.getElementById("vol4").oninput();
        videoSelect('stadt2');
        document.getElementById("loopCheck").checked = false;
        loopEvent(false);
        document.getElementById("asel4_1").value = 'triangle';
        document.getElementById("asel4_1").onchange();
        document.getElementById("asl4_1").value = 82;
        document.getElementById("asl4_1").oninput();
        document.getElementById("asl4_2").value = 44;
        document.getElementById("asl4_2").oninput();
        document.getElementById("asl4_3").value = 127;
        document.getElementById("asl4_3").oninput();
        document.getElementById("asl4_4").value = 78;
        document.getElementById("asl4_4").oninput();
        document.getElementById("sl4_1").value = 26;
        document.getElementById("sl4_1").oninput();
        document.getElementById("sl4_2").value = 72;
        document.getElementById("sl4_2").oninput();
        document.getElementById("sl4_3").value = 67;
        document.getElementById("sl4_3").oninput();
    }
}