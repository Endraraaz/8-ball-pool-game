/**
 * Provides properties of ball.
 */
class Ball {
    /**
     * @param {object} position Provides x,y coordinates position of ball.
     * @param {number} color Provides color of ball.
     */
    constructor(position, color) {
        this.position = position;
        this.velocity = new Vector();
        this.moving = false;
        this.sprite = getBallSpritesByColor(color);
    };

    /**
     * Updates position of ball as per game events occurred.
     * @param {number} delta Provides fraction value by which velocity of ball changes.
     */
    update = (delta) => {

        this.position.addTo(this.velocity.multiply(delta));
        this.velocity = this.velocity.multiply(FRICTION);

        if (this.velocity.length() < 5) {
            this.velocity = new Vector();
            this.moving = false;
        };

    };

    draw = () => {
        canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    };

    /**
     * Gives velocity to ball when striked and sets ball state to moving.
     * @param {number} power Provides power value by how much to strike the cue-ball with stick.
     * @param {number} rotation Provides rotation value of the stick.
     */
    onStrike = (power, rotation) => {
        this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
        this.moving = true;
    };

};