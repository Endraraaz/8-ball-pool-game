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

    
    /**
     * 
     * @param {object} thatBall Provides x,y coordinates as velocity of ball.
     * @returns Exits function if there is no collision.
     */
    collideWithBall = (thatBall) => {

        // Find normal vector between two colliding balls.
        const normalVector = this.position.subtract(thatBall.position);

        // Find distance between two balls.
        const distance = normalVector.length();

        if (distance > BALL_DIAMETER) {
            
            return;
        };

        // Solves overlapping of balls
        const minimumTranslationDistance = normalVector.multiply((BALL_DIAMETER - distance) / distance);
        this.position = this.position.add(minimumTranslationDistance.multiply(1/2));
        thatBall.position = thatBall.position.subtract(minimumTranslationDistance.multiply(1/2));

        // Find unit normal vector between two colliding balls.
        const unitNormalVector = normalVector.multiply(1 / normalVector.length());

        // Find unit tangent vector between two colliding balls.
        const unitTangentVector = new Vector(-unitNormalVector.y, unitNormalVector.x);

        // Project velocities onto the unit normal vector and unit tangent vectors.
        const velocityOneToNormalVector = unitNormalVector.dotProduct(this.velocity);
        const velocityOneToTangentVector = unitTangentVector.dotProduct(this.velocity);
        const velocityTwoToNormalVector = unitNormalVector.dotProduct(thatBall.velocity);
        const velocityTwoToTangentVector = unitTangentVector.dotProduct(thatBall.velocity);

        // Find new normal velocities, equal mass so same as old.
        let velocityOneToNormalVectorNew = velocityTwoToNormalVector;
        let velocityTwoToNormalVectorNew = velocityOneToNormalVector;

        // Convert scalar normal and tangential velocities into vectors.
        velocityOneToNormalVectorNew = unitNormalVector.multiply(velocityOneToNormalVectorNew);
        const velocityOneToTangentVectorNew = unitTangentVector.multiply(velocityOneToTangentVector);
        velocityTwoToNormalVectorNew = unitNormalVector.multiply(velocityTwoToNormalVectorNew);
        const velocityTwoToTangentVectorNew = unitTangentVector.multiply(velocityTwoToTangentVector);

        // Update final velocities of colliding balls.
        this.velocity = velocityOneToNormalVectorNew.add(velocityOneToTangentVectorNew);
        thatBall.velocity = velocityTwoToNormalVectorNew.add(velocityTwoToTangentVectorNew);

        this.moving = true;
        thatBall.moving = true;

    };

};