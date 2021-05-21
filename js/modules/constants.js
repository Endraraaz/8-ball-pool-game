/**
 * @const  {object} COLOR Assigns codes to colors of balls
 */
const COLOR = {
    RED: 1,
    YELLOW: 2,
    BLACK: 3,
    WHITE: 4
};


/**
 * @const  {object} BALL_ORIGIN Assigns origin x,y coordinates of ball
 * @const {number} FRICTION Assigns constant value 0.98 to calculate the drag to stop the moving ball.
 * @const {number} BALL_DIAMETER Assigns constant value 38 as ball diameter.
 * @const {number} BALL_RADIUS Assigns ball radius value.
 */
const BALL_ORIGIN = new Vector(25, 25);
const FRICTION = 0.98;
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;


/**
 * @const  {object} STICK_ORIGIN Assigns origin x,y coordinates of stick
 * @const {object} STICK_STRIKE_ORIGIN Assigns origin x,y coordinates of strike point with cue ball
 * @const {number} POWER Assigns certain value to increase power to strike the cue ball.
 * @const {number} MAX_POWER Assigns maximum power value the stick can hit with.
 * @const {number} POSITION_CHANGE Assigns position change value on increase in power.
 */
const STICK_ORIGIN = new Vector(1030, 11);
const STICK_STRIKE_ORIGIN = new Vector(1010, 11);
const POWER = 120;
const MAX_POWER = 6000;
const POSITION_CHANGE = 5;


/**
 * @const {number} DELTA Assigns constant value 0.01
 */
const DELTA = 1 / 120;
