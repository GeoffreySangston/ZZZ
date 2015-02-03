var GAMEWIDTH = 512;
var GAMEHEIGHT = 512;

// STATES
var INITSTATE = 0; // checks whether a game file exists in localstorage + other stuff
var MENUSTATE = 1;
var GAMESTATE = 2;
var GAMELOSESTATE = 3;
var GAMEWINSTATE = 4;

// KEY INFORMATION
var KEYDOWN = 0;
var KEYUP = 1; // this is an event on keyup, should change to KEYSTATIC after event is handled
var KEYSTATIC = 2;

var DELETE = 8;
var TAB = 9;
var SHIFT = 16;
var CTRL = 17;
var SPACE = 32;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var X = 88;
var Z = 90;
var A = 65;
var W = 87;
var D = 68;
var S = 83;
var L = 76;
var G = 71;
var C = 67;
var V = 86;
var E = 69;