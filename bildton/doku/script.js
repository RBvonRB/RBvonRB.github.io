var els = document.getElementsByClassName("chap");
var iDiv, elDiv;
var tocEl = document.getElementById("right");
var unfolded = false;

document.onscroll = function () {
    Array.from(els).forEach((el, ind) => {
        let elTop = el.getBoundingClientRect().top;
        let elBot = el.getBoundingClientRect().bottom;
        if (elTop < 80 && elBot > -80) {
            iDiv = ind;
        }
        document.getElementById("toc" + ind).style.backgroundColor = "var(--colW)";

    });
    elDiv = document.getElementById("toc" + iDiv);
    if (elDiv)
        elDiv.style.backgroundColor = "var(--colWh)";
}


function unfold() {
    if (unfolded) {
        tocEl.style.height = "60px";
        document.getElementById("arrow").textContent = '\u2191';
        unfolded = false;
    } else {
        tocEl.style.height = "370px";
        document.getElementById("arrow").textContent = '\u2193';
        unfolded = true;
    }

}

function fold() {

}
