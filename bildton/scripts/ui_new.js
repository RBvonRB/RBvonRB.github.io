var timeIndS = 30;
var loopS = timeIndS;
var timeLayer;
var pause = false;
var looperIn, looperOut;
var thumbDiv;

function setupUI() {
    timeLayer = createGraphics(width - cell * 2, cell * 2);
    timeLayer.class('tl');
    rectLayer = createGraphics(w, h);
    thumbDiv = document.getElementById("thumbnailCon");
}

function drawTime() {
    timeLayer.fill(colW);
    timeLayer.strokeWeight(strokeUI);
    timeLayer.stroke(colB);
    timeLayer.rect(0, 0, timeLayer.width, cell);
    timeLayer.rect(0, cell, timeLayer.width, cell * 2);

    timeLayer.fill(colB);
    let videoTransport = capture.time() / capture.duration();
    if (!webcam) {
        if (looper)
            timeLayer.rect(looperIn * timeLayer.width, cell, (videoTransport - looperIn) * timeLayer.width, cell * 2);
        else
            timeLayer.rect(0, cell, videoTransport * timeLayer.width, cell * 2);
    }
    timeLayer.stroke(colB);
    timeLayer.strokeWeight(strokeUI);
    if (looper) {
        timeLayer.fill(colB);
    } else {
        timeLayer.noFill();
    }
    timeLayer.rect(looperIn * timeLayer.width, 0, looperOut * timeLayer.width - (looperIn * timeLayer.width), cell);
    image(timeLayer, cell * 2, height - cell * 2);

    if (mouseX > cell * 2 && mouseX < timeLayer.width + cell * 2 && mouseY > height - cell * 2 && mouseY < height) {
        document.body.style.cursor = 'pointer';
    }
}

function loadThumbnail() {
    let grid = 5;
    let x, y;
    let wT = windowWidth / grid;
    let hT = wT / 16 * 9;
    for (let i = 0; i < videos.length; i++) {
        x = (i % grid) * wT;
        y = floor(i / grid) * hT + 100;
        if (videos[i] == 'webcam') {
            let constraints = {
                video: {
                    mandatory: {
                        maxWidth: sourceW,
                        maxHeight: sourceH
                    },
                    optional: [{ maxFrameRate: 10 }]
                },
                audio: true
            };
            thumbnails[i] = createCapture(constraints, function () {
                thumbnails[i].size(wT, hT);
                thumbnails[i].position(x, y);
                thumbnails[i].volume(0);
            });

        } else {
            thumbnails[i] = createVideo(['assets/videos/thumbs/' + videos[i] + '.mp4'], function () {
            });
            thumbnails[i].size(wT, hT);
            thumbnails[i].volume(0);
            thumbnails[i].position(x, y);
            thumbnails[i].pause();

        }
        thumbnails[i].parent(thumbDiv);
        thumbnails[i].class('thumbnail');

        if (thumbnails[i]) {
            thumbnails[i].mouseOver(function () {
                thumbnails[i].loop();
                document.body.style.cursor = "pointer";
            })
            thumbnails[i].mouseOut(function () {
                thumbnails[i].pause();
                document.body.style.cursor = "auto";
            })

            thumbnails[i].mouseClicked(function () {
                videoSelect(videos[i])
            });
        }
    }
}

function showThumbnail() {
    thumbDiv.style.display = "block";
}

function hideThumbnail() {
    thumbDiv.style.display = "none";
}




function resizeUI(sc) {
    timeLayer = createGraphics(width - cell * 2, cell * 2);
    rectLayer = createGraphics(w, h);
}



function sourceEvent(val) {
    showSource = val;
}

function layerEvent(val) {
    showLayer = val;
}


dragElement(document.getElementById("globalCon"));
dragElement(document.getElementById("modeCon"));


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
