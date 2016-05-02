var canvas = document.getElementById("canvas");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var e = document.getElementById("e");
var l = [];
var ccheck = -1;

var randColor = function randColor(e){
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    var co;
    var ret = '#';
    for(co = 0; co < 6; co++){
	ret += chars[Math.floor(Math.random() * 16)];
    }
    return ret;
};

var makeBall = function makeBall(e){
    var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var r = Math.floor(Math.random() * 15) + 15;
    var xdiff = Math.floor(Math.random() * 4) + 1;
    var ydiff = Math.floor(Math.random() * 4) + 1;
    var posx = Math.floor(Math.random() * (500-2*r)) + r - xdiff;
    var posy = Math.floor(Math.random() * (500-2*r)) + r - ydiff;


    
    c2.setAttribute("cx", posx);
    c2.setAttribute("cy", posy);
    c2.setAttribute("r", r);
    c2.setAttribute("fill", randColor());
    c2.setAttribute("stroke", "black");
    canvas.appendChild(c2);

    var x = function(){
        return posx;
    }
    var y = function(){
        return posy;
    }
    var gxdiff = function (){
	return xdiff;
    }
    var gydiff = function (){
	return ydiff;
    } 
    var cxdiff = function (input){
        xdiff = input;
    }
    var cydiff = function (input){
        ydiff = input;
    }
    var changepos = function(){
	console.log("blah");
	posx += xdiff;
	posy += ydiff;
	if(posx <= r || posx >= 500 - r){
	    xdiff *= -1;
	}
	if(posy <= r || posy >= 500 - r){
	    ydiff *= -1;
	}
	c2.setAttribute("cx", posx);
	c2.setAttribute("cy", posy);
    };
    var collide = function(){
	if(ccheck == 1){
	    var c;
	    for(c = 0; c < l.length; c++){
		var temp = l[c];
		if(temp.x() != posx && temp.y() != posy && temp.xdiff != xdiff && temp.ydiff != ydiff && temp.r != r){
		    if(Math.sqrt((posx - temp.x()) * (posx - temp.x()) + (posy - temp.y()) * (posy - temp.y())) < r + temp.r){
			xdiff *= -1;
			ydiff *= -1;
			temp.xdiff *= -1;
			temp.ydiff *= -1;
			changepos();
			temp.changepos();
		    }
		}
	    }
	}
    }
    return {
	cxdiff : cxdiff,
	cydiff : cydiff,
	gxdiff : gxdiff,
	gydiff : gydiff,
	changepos : changepos,
	collide : collide,
	x : x,
	y : y,
	r : r,
	xdiff : xdiff,
	ydiff : ydiff
    }
};

var add = function add(e) {
    var newball = makeBall();
    l.push(newball);
    setInterval(newball.changepos,33);
    setInterval(newball.collide,16);
};

var ccheckcheck = function ccheckcheck(e){
    ccheck *= -1;
};

var dup = function dup(e){
    l.map(function(x) {
	x.cxdiff(x.gxdiff() * 1.4);
	x.cydiff(x.gydiff() * 1.4);
	return x;
    });
};

var speeding = function speeding(e){
    var caught = [];
    caught = l.filter(function(x){
	return Math.sqrt(Math.pow(x.gxdiff(),2) + Math.pow(x.gydiff(),2)) >= 20;
    });
    var speedcount;
    for(speedcount = 0; speedcount < caught.length; speedcount++){
	caught[speedcount].cxdiff(1);
	caught[speedcount].cydiff(1);
    }
};

var bye = function bye(e){
    if(canvas.childElementCount != 0){
	canvas.removeChild(canvas.children[canvas.childElementCount - 1]);
	l.pop();
    }
};

e.addEventListener("click",bye);
d.addEventListener("click",dup);
c.addEventListener("click",ccheckcheck);
b.addEventListener("click",add);
a.addEventListener("click",speeding);
