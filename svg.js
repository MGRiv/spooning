var canvas = document.getElementById("canvas");
var stop = document.getElementById("s");
var stop = document.getElementById("s");
var i;

var b = document.getElementById("b");

var makeBall = function makeBall(e){
    var posx = Math.floor(Math.random() * 300) + 100;
    var posy = Math.floor(Math.random() * 300) + 100;
    var xdiff = Math.floor(Math.random() * 100);
    var ydiff = Math.floor(Math.random() * 100);
    var add = function(){
	var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c2.setAttribute("cx", posx);
	c2.setAttribute("cy", posy);
	c2.setAttribute("r", 20);
	c2.setAttribute("fill", "#ff0000");
	c2.setAttribute("stroke", "black");
	canvas.appendChild(c2);
    }
    var changepos = function(){
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
    };
    return {
	m : changepos,
	a : add
    }
};

var bounce = function bounce(e) {
    var c;
    for (c = 0; c < 10; c++) { 
	var q = makeBall();
	
    }
    var move = function (e) {
	for(ch in canvas.children){
	    ch.makeBall();	    
	}
    };
    i = setInterval(move,25);
};

var cease = function cease(e) {
    clearInterval(i);
};
stop.addEventListener("click",cease);

b.addEventListener("click",bounce);

