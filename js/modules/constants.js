/**
 * @const  {object} COLOR Assigns codes to colors of balls.
 */
const COLOR = {
    RED: "#FF0000",
    YELLOW: "#FFFF00",
    BLACK: "#000000",
    WHITE: "#FFFFFF"
};

/**
 * @const {object} TABLE Provides the four colliding edges of table.
 */
const TABLE = {
    topY: 57,
    rightX: 1443,
    bottomY: 768,
    leftX: 57
};

/**
 * @const  {object} BALL_ORIGIN Assigns origin x,y coordinates of ball.
 * @const {number} FRICTION Assigns constant value 0.98 to calculate the drag to stop the moving ball.
 * @const {number} BALL_DIAMETER Assigns constant value 38 as ball diameter.
 * @const {number} BALL_RADIUS Assigns ball radius value.
 * @const {Array} BALLS Provides the initial positions and color of balls.
 */
const BALL_ORIGIN = new Vector(25, 25);
const FRICTION = 0.98;
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const BALLS = [
    [new Vector(1022, 413), COLOR.YELLOW], //1
    [new Vector(1056, 393), COLOR.RED],    //2
    [new Vector(1056, 433), COLOR.YELLOW], //3
    [new Vector(1090, 374), COLOR.RED],    //4
    [new Vector(1090, 413), COLOR.BLACK],  //5
    [new Vector(1090, 452), COLOR.RED],    //6
    [new Vector(1126, 354), COLOR.YELLOW], //7
    [new Vector(1126, 393), COLOR.YELLOW], //8
    [new Vector(1126, 433), COLOR.RED],    //9
    [new Vector(1126, 472), COLOR.YELLOW], //10
    [new Vector(1162, 335), COLOR.RED],    //11
    [new Vector(1162, 374), COLOR.YELLOW], //12
    [new Vector(1162, 413), COLOR.RED],    //13
    [new Vector(1162, 452), COLOR.YELLOW], //14
    [new Vector(1162, 491), COLOR.RED],    //15
    [new Vector(413, 413), COLOR.WHITE],   //16
];

/**
 * @const  {object} STICK_ORIGIN Assigns origin x,y coordinates of stick.
 * @const {object} STICK_STRIKE_ORIGIN Assigns origin x,y coordinates of strike point with cue ball.
 * @const {number} POWER Assigns certain value to increase power to strike the cue ball.
 * @const {number} MAX_POWER Assigns maximum power value the stick can hit with.
 * @const {number} POSITION_CHANGE Assigns position change value on increase in power.
 */
const STICK_ORIGIN = new Vector(1030, 11);
const STICK_STRIKE_ORIGIN = new Vector(1010, 11);
const POWER = 120;
const MAX_POWER = 6000;
const POSITION_CHANGE = 2;

/**
 * @const {number} DELTA Assigns constant value 0.01.
 */
const DELTA = 1 / 120;

/**
 * @const {number} POCKET_RADIUS Provides area of the pockets to be considered.
 * @const {Array} POCKETS Provides the coordinates in table where the pockets are.
 */
const POCKET_RADIUS = 46;
const POCKETS = [
    new Vector(750, 32),  //topcenter
    new Vector(750, 794), //bottomcenter
    new Vector(62, 62),   //topleft
    new Vector(1435, 62), //topright
    new Vector(62, 762),  //bottomleft
    new Vector(1435, 762) //bottomright
];

/**
 * @const {object} KEYS Provides ASCII codes for keyboard keys.
 */
const KEYS = {
    escape: 27,
    space: 32,
    A: 65,
    S: 83,
    W: 87
};
let KEYBOARD_INPUT_ON = true;
let GAME_STOPPED = true;
