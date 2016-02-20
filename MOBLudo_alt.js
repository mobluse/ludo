/*
 * Ludo Altline 0.2
 *
 * Copyright (c) 2009 Mikael Bonnier (http://www.df.lth.se.orbin.se/~mikaelb/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
var nmRed = "veronica_belmont",
    nmYellow = "christer_fuglesang",
    nmBlue = "martina_glimberg",
    nmGreen = "howard_dully",
    nm = [nmRed, nmYellow, nmBlue, nmGreen];
var folder = "img/",
    ext = ".jpg",
    lrg = "_l";
var d1, cube, dot00, dot01, dot02, dot11, dot20, dot21, dot22;
function fn(player) {
    return folder + player + ext;
}
function showEnlargement(player) {
    document.getElementById('large').src = folder + player + lrg + ext;
}
function hideEnlargement() {
    document.getElementById('large').src = folder + "spacer.gif";
}
var paper;
var p = new Array(4);    // p is a two dimensional array with players
for (var i = 0; i < p.length; ++i) {
    p[i] = new Array(4);
}
var dice = 0;
function throwDice() {
    dice = Math.floor(Math.random() * 6);
    setDice();
}
function setDice() {
    d1.hide();
    var w = 66;
    d1.rotate(45*Math.floor(Math.random() * 4), cube.attrs.x+0.5*w, cube.attrs.y+0.5*w);
    cube.show();
    switch(dice) {
        case 0:
            dot11.show();
            break;
        case 1:
            dot00.show();
            dot22.show();
            break;
        case 2:
            dot00.show();
            dot11.show();
            dot22.show();
            break;
        case 3:
            dot00.show();
            dot02.show();
            dot20.show();
            dot22.show();
            break;
        case 4:
            dot00.show();
            dot02.show();
            dot20.show();
            dot22.show();
            dot11.show();
            break;
        case 5:
            dot00.show();
            dot01.show();
            dot02.show();
            dot20.show();
            dot21.show();
            dot22.show();
            break;
    }
}
function send() {
    var values = [],
        divimg = cube,
        id = 'd1';
    values[id + 'v'] = dice;
    values[id + 'l'] = divimg.attrs.x + "px";
    values[id + 't'] = divimg.attrs.y + "px";
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            divimg = p[i][j];
            id = 'p' + i + j;
            values[id + 'l'] = divimg.attrs.x + "px";
            values[id + 't'] = divimg.attrs.y + "px";
        }
    }
    var callback = function (json) {
    
    };
    HTTP.post("storeludopos.php", values, callback, null); 
}
function receive() {
    var callback = function (json) {
        var divimg = d1,
            id = 'd1';
        dice = parseInt(json[id + 'v'], 10);
        setDice();
        divimg.translate(parseInt(json[id + 'l'], 10) - cube.attrs.x, 
            parseInt(json[id + 't'], 10) - cube.attrs.y);
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                divimg = p[i][j];
                id = 'p' + i + j;
                divimg.translate(parseInt(json[id + 'l'], 10) - divimg.attrs.x, 
                    parseInt(json[id + 't'], 10) - divimg.attrs.y);
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
    dy = d;
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
var xSave = x, ySave = y;
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

var fnRed = fn(nmRed);
p[0][0] = paper.image(fnRed, 0, 0, 48, 48);
p[0][1] = paper.image(fnRed, 0, 50, 48, 48);
p[0][2] = paper.image(fnRed, 0, 100, 48, 48);
p[0][3] = paper.image(fnRed, 0, 150, 48, 48);
var fnYellow = fn(nmYellow);
p[1][0] = paper.image(fnYellow, 12*d-48, 0, 48, 48);
p[1][1] = paper.image(fnYellow, 12*d-48, 50, 48, 48);
p[1][2] = paper.image(fnYellow, 12*d-48, 100, 48, 48);
p[1][3] = paper.image(fnYellow, 12*d-48, 150, 48, 48);
var fnBlue = fn(nmBlue);
p[2][0] = paper.image(fnBlue, 12*d-48, 12*d-48-0, 48, 48);
p[2][1] = paper.image(fnBlue, 12*d-48, 12*d-48-50, 48, 48);
p[2][2] = paper.image(fnBlue, 12*d-48, 12*d-48-100, 48, 48);
p[2][3] = paper.image(fnBlue, 12*d-48, 12*d-48-150, 48, 48);
var fnGreen = fn(nmGreen);
p[3][0] = paper.image(fnGreen, 0, 12*d-48-0, 48, 48);
p[3][1] = paper.image(fnGreen, 0, 12*d-48-50, 48, 48);
p[3][2] = paper.image(fnGreen, 0, 12*d-48-100, 48, 48);
p[3][3] = paper.image(fnGreen, 0, 12*d-48-150, 48, 48);
var j;
for (i = 0; i < 4; ++i) {
    for (j = 0; j < 4; ++j) {
        p[i][j].toFront().mousedown(function (event) { drag(this, this, event); }).mouseout(function (event) { 
            if (!window.dragging) { hideEnlargement(); }});
    }
}
for (j = 0; j < 4; ++j) {
    p[0][j].mouseover(function (event) { showEnlargement(nm[0]); });
    p[1][j].mouseover(function (event) { showEnlargement(nm[1]); });
    p[2][j].mouseover(function (event) { showEnlargement(nm[2]); });
    p[3][j].mouseover(function (event) { showEnlargement(nm[3]); });
}
var w = 66;
cube = paper.rect(200, 200, w, w, 11).toFront().attr({fill: cWhite});
var cBlack = "black";
var s = 0.2;
dot00 = paper.circle(200+s*w, 200+s*w, 6).toFront().attr({fill: cBlack});
// dot00.attr({cx: 200+0.5*w, cy: 200+0.5*w});
dot01 = paper.circle(200+s*w, 200+0.5*w, 6).toFront().attr({fill: cBlack});
dot02 = paper.circle(200+s*w, 200+(1-s)*w, 6).toFront().attr({fill: cBlack});
dot11 = paper.circle(200+0.5*w, 200+0.5*w, 6).toFront().attr({fill: cBlack});
dot20 = paper.circle(200+(1-s)*w, 200+s*w, 6).toFront().attr({fill: cBlack});
dot21 = paper.circle(200+(1-s)*w, 200+0.5*w, 6).toFront().attr({fill: cBlack});
dot22 = paper.circle(200+(1-s)*w, 200+(1-s)*w, 6).toFront().attr({fill: cBlack});
d1 = paper.set();
d1.push(cube, dot00, dot01, dot02, dot11, dot20, dot21, dot22);
cube.mousedown(function (event) { drag(this, d1, event); }).dblclick(function (event) { throwDice(); });
setDice();
document.getElementById("btnThrowDice").onclick = function (event) { throwDice(); };
document.getElementById("btnSend").onclick = function (event) { send(); };
document.getElementById("btnReceive").onclick = function (event) { receive(); };

x = xSave;
y = ySave;
paper.sector(x, y, 1.5*r, 45, 135, {fill: cYellow}).toBack();
paper.sector(x, y, 1.5*r, 135, 225, {fill: cRed}).toBack();
paper.sector(x, y, 1.5*r, 225, 315, {fill: cGreen}).toBack();
paper.sector(x, y, 1.5*r, 315, 45, {fill: cBlue}).toBack();
var cYellowgreen = "yellowgreen";
paper.rect(0, 0, 12*d, 12*d).toBack().attr({fill: cYellowgreen});
};
