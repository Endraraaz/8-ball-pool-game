/**
 * Creates and updates the game objects in the game environment.
 */
class GameEnvironment {
    constructor() {

        this.balls = BALLS.map(ballSelect => new Ball(...ballSelect));
        this.cueBall = this.balls.find(ballSelect => ballSelect.color === COLOR.WHITE);
        this.stick = new Stick(new Vector(413, 413), this.cueBall.onStrike);
        this.table = TABLE;
    };

    /**
     * Checks Collisions between balls.
     */
    checkCollisions = () => {

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].checkBallInPocket();
            this.balls[i].collideWithTable(this.table);
            for (let j = i + 1; j < this.balls.length; j++) {
                let firstCollidingBall = this.balls[i];
                let secondCollidingBall = this.balls[j];
                firstCollidingBall.collideWithBall(secondCollidingBall);
            };
        };
    };

    /**
     * Updates game objects in game environment as per events occurred in game.
     */
    update = () => {

        this.checkCollisions();

        this.balls.forEach(ballSelect => {
            ballSelect.update(DELTA);
        });

        if (!this.ballsMoving() && this.stick.striked) {
            this.stick.reposition(this.cueBall.position);
        };

        this.stick.update();
    };

    /**
     * Draws game objects to canvas.
     */
    draw = () => {
        canvas.drawImage(sprites.background, { x: 0, y: 0 });

        this.balls.forEach(ballSelect => {
            ballSelect.draw();
        });

        this.stick.draw();
    };

    /**
     * @returns state of balls whether moving or stationary.
     */
    ballsMoving = () => {

        let movingBalls = false;

        this.balls.forEach(ball => {
            if (ball.moving) {
                movingBalls = true;
                return false;
            };
        });

        return movingBalls;
    };

};