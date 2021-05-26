/**
 * Provides properties of stick.
 */
class Stick {
    /**
     * @param {object} position Provides x,y coordinates of stick position.
     * @param {method} onStrike Passes onStrike method of instance of Ball class.
     */
    constructor(position, onStrike) {
        this.position = position;
        this.rotation = 0;
        this.origin = STICK_ORIGIN.copy();
        this.power = 0;
        this.onStrike = onStrike;
        this.striked = false;
        this.visible = true;
    };

    /**
     * Updates stick position after every strike occurs to position of cue ball.
     * @returns Exits if ball is striked and is in moving state.
     */
    update = () => {

        if (this.striked) {
            this.visible = false;
            return;
        };

        if (keyboard.down(KEYS.W) && KEYBOARD_INPUT_ON) {
            this.increasePower();
        } else if (keyboard.down(KEYS.S) && KEYBOARD_INPUT_ON) {
            this.decreasePower();
        } else if (this.power > 0 && mouse.leftButton.down) {
            this.strike();
            // poolGame.gameRules.turnPlayed = true;
        };

        this.visible = true;
        this.updateRotation();
    };

    /**
     * Draws game object stick to canvas. 
     * @returns Exits if stick state is set to not visible.
     */
    draw = () => {
        if (!this.visible)
            return;
        canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    };

    /**
     * Rotates the stick position referenced opposite to the mouse pointer.
     * 
     * The arcTangent of oppositePosition and adjacentPosition 
     * gives the value of rotation.
     * Reference: https://sinepost.wordpress.com/2012/02/16/theyve-got-atan-you-want-atan2/
     */
    updateRotation = () => {
        let oppositePosition = mouse.position.y - this.position.y;
        let adjacentPosition = mouse.position.x - this.position.x;

        this.rotation = Math.atan2(oppositePosition, adjacentPosition);
    };

    /**
     * Increases power by certain value.
     */
    increasePower = () => {
        if (this.power > MAX_POWER) {
            return;
        }
        this.power += POWER;
        this.origin.x += POSITION_CHANGE;
    };


    /**
    * Increases power by certain value.
    */
    decreasePower = () => {
        if (this.power < 0) {
            return;
        }
        this.power -= POWER;
        this.origin.x -= POSITION_CHANGE;
    };

    /**
     * Strikes the cue-ball when stick power is released.
     */
    strike = () => {

        this.onStrike(this.power, this.rotation);
        this.power = 0;
        this.origin = STICK_STRIKE_ORIGIN.copy();
        this.striked = true;
    };

    /**
     * Repositions stick with reference to cue-ball.
     * @param {object} position Provides new position of cue-ball when it stops moving after strike.
     */
    reposition = (position) => {
        this.position = position.copy();
        this.origin = STICK_ORIGIN.copy();
        this.striked = false;
    };

};