/**
 * Creates and updates the game objects in the game environment.
 */
class GameEnvironment {
    constructor() {
        this.balls = BALLS.map(ballSelect => new Ball(...ballSelect));
        this.redBalls = this.balls.filter(ballSelect => ballSelect.color === COLOR.RED);
        this.yellowBalls = this.balls.filter(ballSelect => ballSelect.color === COLOR.YELLOW);
        this.blackBall = this.balls.find(ballSelect => ballSelect.color === COLOR.BLACK);
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
            // if (this.balls[i].checkBallInPocket()) {
            //     poolGame.gameRules.checkBallInHole(this.balls[i]);
            // };
            this.balls[i].collideWithTable(this.table);
            for (let j = i + 1; j < this.balls.length; j++) {
                let firstCollidingBall = this.balls[i];
                let secondCollidingBall = this.balls[j];
                firstCollidingBall.collideWithBall(firstCollidingBall, secondCollidingBall);
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
            // poolGame.gameRules.updateTurnOutcome();

            // if (poolGame.gameRules.foul) {
            //     this.ballInHand();
            // };

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

    /**
    * Selects balls by color and returns its value.
    */
    getBallSetsByColor = (color) => {
        switch (color) {
            case COLOR.RED:
                return this.redBalls;
            case COLOR.YELLOW:
                return this.yellowBalls;
            case COLOR.BLACK:
                return this.blackBall;
            case COLOR.WHITE:
                return this.cueBall;
        };
    };

    // ballInHand = () => {

    //     KEYBOARD_INPUT_ON = false;
    //     this.stick.visible = false;
    //     if (!mouse.leftButton.down) {
    //         this.cueBall.position = mouse.position;
    //     } else {
    //         let ballsOverlap = this.cueBallOverlapsBalls();

    //         if (!poolGame.gameRules.isOutsideBorder(mouse.position, this.cueBall.origin) &&
    //             !poolGame.gameRules.isInsideHole(mouse.position) && !ballsOverlap) {
    //             KEYBOARD_INPUT_ON = true;
    //             keyboard.reset();
    //             mouse.reset();
    //             this.cueBall.position = mouse.position;
    //             this.cueBall.inHole = false;
    //             poolGame.gameRules.foul = false;
    //             this.stick.position = this.cueBall.position;
    //             this.stick.visible = true;
    //         };
    //     };
    // };

    // cueBallOverlapsBalls = () => {

    //     let ballsOverlap = false;
    //     for (let i = 0; i < this.balls.length; i++) {
    //         if (this.cueBall !== this.balls[i]) {
    //             if (this.cueBall.position.distanceFrom(this.balls[i].position) < BALL_DIAMETER) {
    //                 ballsOverlap = true;
    //             };
    //         };
    //     };

    //     return ballsOverlap;
    // };

};