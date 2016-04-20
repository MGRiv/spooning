var canvas = document.getElementById("canvas");
var stop = document.getElementById("s");
var i;

var b = document.getElementById("b");

var bounce = function bounce(e) {
    if(canvas.childElementCount != 0){
	canvas.removeChild(canvas.children[0]);
	clearInterval(i);
    }
    var posx = Math.floor(Math.random() * 300) + 100;
    var posy = Math.floor(Math.random() * 300) + 100;
    var xdiff = 1;    
    var ydiff = 0;
    var mod = .05;
    var move = function (e) {
	if(canvas.childElementCount != 0){
	    canvas.removeChild(canvas.children[0]);
	}
	posx += xdiff;
	posy += ydiff;
	if(posx < 20 || posx > 480){
	    posx -= xdiff;
	    xdiff *= -1;
	}
	if(posy > 480){
	    posy -= ydiff;
	    ydiff *= -1;
	}
	ydiff += mod;
	var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c2.setAttribute("cx", posx);
	c2.setAttribute("cy", posy);
	c2.setAttribute("r", 20);
	c2.setAttribute("fill", "#ff0000");
	c2.setAttribute("stroke", "black");
	canvas.appendChild(c2);
    };
    i = setInterval(move,25);
};

var cease = function cease(e) {
    clearInterval(i);
};

b.addEventListener("click",bounce);
stop.addEventListener("click",cease);
