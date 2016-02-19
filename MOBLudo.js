/*
 * Ludo Mainline 0.1
 *
 * Copyright (c) 2009 Mikael Bonnier (http://www.df.lth.se.orbin.se/~mikaelb/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
var nmRed = "veronica_belmont",
    nmYellow = "christer_fuglesang",
    nmBlue = "martina_glimberg",
    nmGreen = "howard_dully",
    nms = [nmRed, nmYellow, nmBlue, nmGreen];
var folder = "img/",
    ext = ".jpg",
    lrg = "_l";
function showEnlargement(player) {
    document.getElementById('large').src = folder + player + lrg + ext;
}
function hideEnlargement() {
    document.getElementById('large').src = folder + "spacer.gif";
}
var imgDices = new Array(6);    // Images of the six sides of a dice
function loadImages() {
    for (var i = 0; i < 6; ++i) {
        imgDices[i] = new Image();
        imgDices[i].src = ""+(i+1)+".gif";
    }
}
var dice = 1;
function throwDice() {
    var imgDice = document.getElementById("imgDice1");
    imgDice.src = imgDices[dice = Math.floor(Math.random()*6)].src;
}
function send() {
    var values = [],
        id = "d1",
        divimg = document.getElementById(id);
    values[id + 'v'] = dice;
    values[id + 'l'] = divimg.style.left;
    values[id + 't'] = divimg.style.top;
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            id = "p" + i + j;
            divimg = document.getElementById(id);
            values[id + 'l'] = divimg.style.left;
            values[id + 't'] = divimg.style.top;
        }
    }
    var callback = function (json) {
    
    };
    HTTP.post("storeludopos.php", values, callback, null);
}
function receive() {
    var callback = function (json) {
        var id = "d1";
        dice = json[id + "v"];
        var imgDice = document.getElementById("imgDice1");
        imgDice.src = imgDices[dice].src;
        var divimg = document.getElementById(id);
        divimg.style.left = json[id + "l"];
        divimg.style.top = json[id + "t"];
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                id = "p" + i + j;
                divimg = document.getElementById(id);
                divimg.style.left = json[id + "l"];
                divimg.style.top = json[id + "t"];
            }
        }        
    };
    HTTP.get("ludopos.php", callback, {});
}
window.onload = function () {
Raphael.fn.sector = function (cx, cy, r, startAngle, endAngle, params) {
    var paper = this,
        rad = Math.PI / 180,
    x1 = cx + r * Math.cos(-startAngle * rad),
    x2 = cx + r * Math.cos(-endAngle * rad),
    y1 = cy + r * Math.sin(-startAngle * rad),
    y2 = cy + r * Math.sin(-endAngle * rad);
    return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 
        0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
};

var d = 60,
    x = 7*d,
    y = d,
    r = 20,
    dx = 0,
    dy = d,
    paper = Raphael(0, 0, 12*d, 12*d);
var cWhite = "white";
paper.circle(x, y, r).toBack().attr({fill: cWhite});
for (var i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = d;
dy = 0;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = 0;
dy = d;
for (i = 0; i < 2; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = -d;
dy = 0;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = 0;
dy = d;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = -d;
dy = 0;
for (i = 0; i < 2; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = 0;
dy = -d;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = -d;
dy = 0;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = 0;
dy = -d;
for (i = 0; i < 2; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = d;
dy = 0;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = 0;
dy = -d;
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
}
dx = d;
dy = 0;
paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cWhite});
dx = 0;
dy = d;
var cYellow = "yellow";
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cYellow});
}
y += d;
var cGreen = "green";
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cGreen});
}
y -= 4*d;
x -= 5*d;
dx = d;
dy = 0;
var cRed = "red";
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cRed});
}
x += d;
var cBlue = "blue";
for (i = 0; i < 4; ++i) {
    paper.circle(x+=dx, y+=dy, r).toBack().attr({fill: cBlue});
}
x -= 4*d;
paper.sector(x, y, 1.5*r, 45, 135, {fill: cYellow}).toBack();
paper.sector(x, y, 1.5*r, 135, 225, {fill: cRed}).toBack();
paper.sector(x, y, 1.5*r, 225, 315, {fill: cGreen}).toBack();
paper.sector(x, y, 1.5*r, 315, 45, {fill: cBlue}).toBack();
paper.circle(x+=4.5*d, y-=4.5*d, r).toBack().attr({fill: cYellow});
paper.circle(x, y+=d, r).toBack().attr({fill: cYellow});
paper.circle(x-=d, y, r).toBack().attr({fill: cYellow});
paper.circle(x, y-=d, r).toBack().attr({fill: cYellow});
paper.circle(x+0.5*d, y+0.5*d, d+r).toBack().attr({stroke: cYellow, fill: cWhite});
paper.circle(x+=d, y+=8*d, r).toBack().attr({fill: cBlue});
paper.circle(x, y+=d, r).toBack().attr({fill: cBlue});
paper.circle(x-=d, y, r).toBack().attr({fill: cBlue});
paper.circle(x, y-=d, r).toBack().attr({fill: cBlue});
paper.circle(x+0.5*d, y+0.5*d, d+r).toBack().attr({stroke: cBlue, fill: cWhite});
paper.circle(x-=7*d, y, r).toBack().attr({fill: cGreen});
paper.circle(x, y+=d, r).toBack().attr({fill: cGreen});
paper.circle(x-=d, y, r).toBack().attr({fill: cGreen});
paper.circle(x, y-=d, r).toBack().attr({fill: cGreen});
paper.circle(x+0.5*d, y+0.5*d, d+r).toBack().attr({stroke: cGreen, fill: cWhite});
paper.circle(x+=d, y-=8*d, r).toBack().attr({fill: cRed});
paper.circle(x, y+=d, r).toBack().attr({fill: cRed});
paper.circle(x-=d, y, r).toBack().attr({fill: cRed});
paper.circle(x, y-=d, r).toBack().attr({fill: cRed});
paper.circle(x+0.5*d, y+0.5*d, d+r).toBack().attr({stroke: cRed, fill: cWhite});
var cYellowgreen = "yellowgreen";
paper.rect(0, 0, 12*d, 12*d).toBack().attr({fill: cYellowgreen});
var el;
var j;
for (i = 0; i < 4; ++i) {
    for (j = 0; j < 4; ++j) {
        el = document.getElementById("p" + i + j);
        el.onmousedown = function (event) { drag(this, event); };
        el.onmouseout = function (event) { hideEnlargement(); };
    }
}
for (j = 0; j < 4; ++j) {
    el = document.getElementById("p" + 0 + j);
    el.onmouseover = function (event) { showEnlargement(nms[0]); };
    el = document.getElementById("p" + 1 + j);
    el.onmouseover = function (event) { showEnlargement(nms[1]); }; 
    el = document.getElementById("p" + 2 + j);
    el.onmouseover = function (event) { showEnlargement(nms[2]); }; 
    el = document.getElementById("p" + 3 + j);
    el.onmouseover = function (event) { showEnlargement(nms[3]); };  
}
loadImages();
el = document.getElementById("d1");
el.onmousedown = function (event) { drag(this, event); };
el.ondblclick = function (event) { throwDice(); };
document.getElementById("btnThrowDice").onclick = function (event) { throwDice(); };
document.getElementById("btnSend").onclick = function (event) { send(); };
document.getElementById("btnReceive").onclick = function (event) { receive(); };
};
