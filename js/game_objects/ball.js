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
     * Checks collisions betweeen balls.
     * @param {object} secondCollidingBall Provides x,y coordinates as velocity of ball.
     * @returns Exits function if there is no collision.
     */
    collideWithBall = (secondCollidingBall) => {

        // Find normal vector between two colliding balls.
        const normalVector = this.position.subtract(secondCollidingBall.position);

        // Find distance between two balls.
        const distance = normalVector.length();

        if (distance > BALL_DIAMETER) {
            
            return;
        };

        // Solves overlapping of balls
        const minimumTranslationDistance = normalVector.multiply((BALL_DIAMETER - distance) / distance);
        this.position = this.position.add(minimumTranslationDistance.multiply(1/2));
        secondCollidingBall.position = secondCollidingBall.position.subtract(minimumTranslationDistance.multiply(1/2));

        // Find unit normal vector between two colliding balls.
        const unitNormalVector = normalVector.multiply(1 / normalVector.length());

        // Find unit tangent vector between two colliding balls.
        const unitTangentVector = new Vector(-unitNormalVector.y, unitNormalVector.x);

        // Project velocities onto the unit normal vector and unit tangent vectors.
        const velocityOneToNormalVector = unitNormalVector.dotProduct(this.velocity);
        const velocityOneToTangentVector = unitTangentVector.dotProduct(this.velocity);
        const velocityTwoToNormalVector = unitNormalVector.dotProduct(secondCollidingBall.velocity);
        const velocityTwoToTangentVector = unitTangentVector.dotProduct(secondCollidingBall.velocity);

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
        secondCollidingBall.velocity = velocityTwoToNormalVectorNew.add(velocityTwoToTangentVectorNew);

        this.moving = true;
        secondCollidingBall.moving = true;

    };

    /**
     * Checks collision of balls with table inner collision edges.
     * @param {object} table Provides object with pool table inner collision edges value.
     * @returns Exits if ball is not moving.
     */
    collideWithTable = (table) => {

        if(!this.moving){
            
            return;
        };
    
        let collided = false;
    
        if(this.position.y <= table.topY + BALL_RADIUS){
            this.position.y = table.topY + BALL_RADIUS;
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            collided = true;
        };
    
        if(this.position.x >= table.rightX - BALL_RADIUS){
            this.position.x = table.rightX - BALL_RADIUS;
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            collided = true;
        };
    
        if(this.position.y >= table.bottomY - BALL_RADIUS){
            this.position.y = table.bottomY - BALL_RADIUS;
            this.velocity = new Vector(this.velocity.x, -this.velocity.y);
            collided = true;
        };
    
        if(this.position.x <= table.leftX + BALL_RADIUS){
            this.position.x = table.leftX + BALL_RADIUS;
            this.velocity = new Vector(-this.velocity.x, this.velocity.y);
            collided = true;
        };
    
        if(collided){
            this.velocity = this.velocity.multiply(FRICTION);
        };
    
    };

};