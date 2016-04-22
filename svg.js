var canvas = document.getElementById("canvas");
var b = document.getElementById("b");
var l = [];

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
    return {
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

b.addEventListener("click",add);
