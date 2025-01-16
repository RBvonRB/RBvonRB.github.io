function setupOSCscript() {
    if (typeof (io) !== 'undefined')
        setupOsc(12000, 3334);
}

function receiveOsc(address, value) {
    // console.log("received OSC: " + address + ", " + value);


    let v = value * 127;

    if (address.includes('/p1/')) {
        if (address.includes('/global/')) {

            if (address.includes('/push1')) {
                if (v > 0) {
                    document.getElementById("play").click();
                }
            } else if (address.includes('/toggle1')) {
                if (v > 0) {
                    document.getElementById("muteCheck").checked = true;
                    muteEvent(true);
                } else {
                    document.getElementById("muteCheck").checked = false;
                    muteEvent(false);
                }
            } else if (address.includes('/fader1')) {
                document.getElementById("vol").value = v;
                volEvent(v);
            } else if (address.includes('/toggle2')) {
                if (v > 0) {
                    document.getElementById("loopCheck").checked = true;
                    loopEvent(true);
                } else {
                    document.getElementById("loopCheck").checked = false;
                    loopEvent(false);
                }
            } else if (address.includes('/fader2')) {
                document.getElementById("spdSl").value = v;
                spdEvt(v);
            } else if (address.includes('/toggle3')) {
                if (v > 0) {
                    document.getElementById("sourceCheck").checked = true;
                    sourceEvent(true);
                } else {
                    document.getElementById("sourceCheck").checked = false;
                    sourceEvent(false);
                }
            } else if (address.includes('/toggle4')) {
                if (v > 0) {
                    document.getElementById("layerCheck").checked = true;
                    layerEvent(true);
                } else {
                    document.getElementById("layerCheck").checked = false;
                    layerEvent(false);
                }
            } else if (address.includes('/toggle5')) {
                if (v > 0) {
                    toggleUI(true);
                    controls = true;
                } else {
                    toggleUI(false);
                    controls = false;
                }
            } else if (address.includes('multipush1')) {
                if (v > 0) {
                    let pInd = address.slice(-1) - 1;
                    document.getElementById("presetList").selectedIndex = pInd;
                    presetEvt("preset" + (pInd + 1));
                }
            }

        } else if (address.includes('/mode/')) {

            if (address.includes('multipush1')) {
                if (v > 0) {
                    let p = 5 - address.slice(-3, -2);
                    document.getElementById("modeRadio").mode.value = p;
                    modeChange(p);
                }
            }

            if (address.includes('/multifader1/4')) {
                document.getElementById("vol1").value = v;
                vol1Evt(v);
            } else if (address.includes('/multifader1/3')) {
                document.getElementById("vol2").value = v;
                vol2Evt(v);
            } else if (address.includes('/multifader1/2')) {
                document.getElementById("vol3").value = v;
                vol3Evt(v);
            } else if (address.includes('/multifader1/1')) {
                document.getElementById("vol4").value = v;
                vol4Evt(v);
            } else if (address.includes('multipush1')) {
                if (v > 0) {
                    let p = address.slice(-1) - 1;
                    if (p < 4) {
                        document.getElementById("presetList").selectedIndex = p;
                        presetEvt(p);
                    }
                }
            }
        } else if (address.includes('/mSamples')) {
            if (mode == 1) {
                if (address.includes('/push1')) {
                    if (v > 0) {
                        document.getElementById("but1_1").click();
                    }
                }
            } else if (mode == 3) {
                if (address.includes('/push1')) {
                    if (v > 0) {
                        document.getElementById("but3_1").click();
                    }
                }
            } else if (mode == 4) {
                if (address.includes('/push1')) {
                    if (v > 0) {
                        document.getElementById("but4_1").click();
                    }
                }
            }
        } else if (address.includes('/mVideo/')) {
            if (mode == 1) {
                if (address.includes('/toggle1')) {
                    if (v > 0) {
                        document.getElementById("tgl1_1").checked = true;
                        tgl1_1Evt(true);
                    } else {
                        document.getElementById("tgl1_1").checked = false;
                        tgl1_1Evt(false);
                    }
                } else if (address.includes('/multifader1/4')) {
                    document.getElementById("sl1_1").value = v;
                    sl1_1Evt(v);
                }
            } else if (mode == 2) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("sl2_1").value = v;
                    sl2_1Evt(v);
                }
            } else if (mode == 3) {
            } else if (mode == 4) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("sl4_1").value = v;
                    sl4_1Evt(v);
                } else if (address.includes('/multifader1/3')) {
                    document.getElementById("sl4_2").value = v;
                    sl4_2Evt(v);
                } else if (address.includes('/multifader1/2')) {
                    document.getElementById("sl4_3").value = v;
                    sl4_3Evt(v);
                }
            }
        } else if (address.includes('/mAudio/')) {
            if (mode == 1) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("asl1_1").value = v;
                    asl1_1Evt(v);
                } else if (address.includes('/multifader1/3')) {
                    document.getElementById("asl1_2").value = v;
                    asl1_2Evt(v);
                } else if (address.includes('/multifader1/2')) {
                    document.getElementById("asl1_3").value = v;
                    asl1_3Evt(v);
                } else if (address.includes('/multifader1/1')) {
                    document.getElementById("asl1_4").value = v;
                    asl1_4Evt(v);
                } else if (address.includes('multipush1')) {
                    if (v > 0) {
                        let p = 5 - address.slice(-3, -2);
                        //console.log(p);
                        if (p < 4) {
                            document.getElementById("asel1_1").selectedIndex = p;
                            asel1_1Evt(waveshapes[p]);
                        }
                    }
                }
            } else if (mode == 2) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("asl2_1").value = v;
                    asl2_1Evt(v);
                } else if (address.includes('/multifader1/3')) {
                    document.getElementById("asl2_2").value = v;
                    asl2_2Evt(v);
                } else if (address.includes('/multifader1/2')) {
                    document.getElementById("asl2_3").value = v;
                    asl2_3Evt(v);
                } else if (address.includes('multipush1')) {
                    if (v > 0) {
                        let p = 5 - address.slice(-3, -2);
                        //console.log(p);
                        // if (p < 4) {
                        document.getElementById("asel2_1").selectedIndex = p;
                        asel2_1Evt(waveshapes[p]);
                        // }
                    }
                }
            } else if (mode == 3) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("asl3_1").value = v;
                    asl3_1Evt(v);
                } else if (address.includes('/multifader1/3')) {
                    document.getElementById("asl3_2").value = v;
                    asl3_2Evt(v);
                } else if (address.includes('/multifader1/2')) {
                    document.getElementById("asl3_3").value = v;
                    asl3_3Evt(v);
                } else if (address.includes('/multifader1/1')) {
                    document.getElementById("asl3_4").value = v;
                    asl3_4Evt(v);
                } else if (address.includes('multipush1')) {
                    if (v > 0) {
                        let p = 5 - address.slice(-3, -2);
                        //console.log(p);
                        if (p < 4) {
                            document.getElementById("asel3_1").selectedIndex = p;
                            asel3_1Evt(waveshapes[p]);
                        }
                    }
                }
            } else if (mode == 4) {
                if (address.includes('/multifader1/4')) {
                    document.getElementById("asl4_1").value = v;
                    asl4_1Evt(v);
                } else if (address.includes('/multifader1/3')) {
                    document.getElementById("asl4_2").value = v;
                    asl4_2Evt(v);
                } else if (address.includes('/multifader1/2')) {
                    document.getElementById("asl4_3").value = v;
                    asl4_3Evt(v);
                } else if (address.includes('/multifader1/1')) {
                    document.getElementById("asl4_4").value = v;
                    asl4_4Evt(v);
                } else if (address.includes('multipush1')) {
                    if (v > 0) {
                        let p = 5 - address.slice(-3, -2);
                        //console.log(p);
                        if (p < 4) {
                            document.getElementById("asel4_1").selectedIndex = p;
                            asel4_1Evt(waveshapes[p]);
                        }
                    }
                }
            }
        }
    }
}

function sendOsc(address, value) {
    socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
    var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
    socket.on('connect', function () {
        socket.emit('config', {
            server: { port: oscPortIn, host: '127.0.0.1' },
            client: { port: oscPortOut, host: '127.0.0.1' }
        });
    });
    socket.on('message', function (msg) {
        if (msg[0] == '#bundle') {
            for (var i = 2; i < msg.length; i++) {
                receiveOsc(msg[i][0], msg[i].splice(1));
            }
        } else {
            receiveOsc(msg[0], msg.splice(1));
        }
    });
}
