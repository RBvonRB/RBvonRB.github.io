
var els = document.getElementsByClassName("projects");
var proj = false;
var colH = "50px";
var pVal = "gigs";
var mobile = window.matchMedia('(max-width: 1080px)').matches;


if (!mobile) {

    function foldEvt(val) {
        // console.log(val);
        if (val == 'projects') {
            document.getElementById(pVal).style.height = colH;
            proj = !proj;
            projTrig(proj);
            selProj('bildton');
        } else {
            document.getElementById(pVal).style.height = colH;
            document.getElementById(val).style.height = "auto";
            pVal = val;
        }
    }


    function closeProj() {
        proj = false;
        projTrig(proj);
    }

    function projTrig(val) {
        if (val) {
            document.getElementById("projectsCont").style.display = "block";
            document.getElementById("col2to4").style.display = "none";
            document.getElementById("projects").style.height = "auto";
        } else {
            document.getElementById("projectsCont").style.display = "none";
            document.getElementById("col2to4").style.display = "block";
            document.getElementById("projects").style.height = colH;
        }
    }

    function selProj(val) {
        Array.from(els).forEach((el) => {
            document.getElementById(el.id).style.display = "none";
        });
        document.getElementById(val).style.display = "block";
    }

}
