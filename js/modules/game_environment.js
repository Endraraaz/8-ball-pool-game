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
        this.cueBallInHand = false;
        this.gameOver = false;

    };

    /**
     * Reset Game objects properties after match is over.
     */
    reset = () => {
        this.gameOver = false;

        this.balls = BALLS.map(ballSelect => new Ball(...ballSelect));
        this.cueBall = this.balls.find(ballSelect => ballSelect.color === COLOR.WHITE);
        this.cueBall.position = new Vector(413, 413);

        this.balls.forEach(ballSelect => {
            ballSelect.reset();
        });

        this.stick = new Stick(new Vector(413, 413), this.cueBall.onStrike);
        this.stick.reset();

    };

    /**
     * Checks Collisions between balls.
     */
    checkCollisions = () => {

        if (poolGame.gameRules.foul && this.cueBallInHand) {

            return;
        };

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

        if (!this.ballsMoving() && this.stick.striked) {
            poolGame.gameRules.updateTurnOutcome();

            if (poolGame.gameRules.foul) {
                this.ballInHand();
            } else {
                this.stick.reposition(this.cueBall.position);
            };


        };

        this.checkCollisions();

        this.balls.forEach(ballSelect => {
            ballSelect.update(DELTA);
        });

        this.stick.update();

    };

    /**
     * Draws game objects to canvas.
     */
    draw = () => {
        canvas.drawImage(sprites.background, { x: 0, y: 0 });

        // If match is over displays match outcome otherwise turn of player.
        if (this.gameOver) {
            poolGame.gameRules.drawMatchOutcome();
        } else {
            poolGame.gameRules.drawPlayerTurn();
        };

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

    /**
     * Executes when foul is detected and provides cue ball in hand feature.
     */
    ballInHand = () => {

        this.cueBallInHand = true;
        KEYBOARD_INPUT_ON = false;
        this.stick.visible = false;
        if (!mouse.leftButton.down) {
            this.cueBall.position = mouse.position;
        } else {
            let ballsOverlap = this.cueBallOverlapsBalls();

            if (!poolGame.gameRules.isOutsideBorder(mouse.position, this.cueBall.origin) &&
                !poolGame.gameRules.isInsidePocket(mouse.position) &&
                !ballsOverlap) {
                KEYBOARD_INPUT_ON = true;
                keyboard.reset();
                mouse.reset();
                this.cueBall.position = mouse.position;
                this.cueBall.inPocket = false;
                poolGame.gameRules.foul = false;
                this.stick.position = this.cueBall.position;
                this.stick.visible = true;
                this.cueBallInHand = false;
            };
        };
    };

    /**
     * Checks if cue ball overlaps with other balls when placing freely in ball in hand state.
     * @returns boolean value.
     */
    cueBallOverlapsBalls = () => {

        let ballsOverlap = false;
        for (let i = 0; i < this.balls.length; i++) {
            if (this.cueBall !== this.balls[i]) {
                if (this.cueBall.position.distanceFrom(this.balls[i].position) < BALL_DIAMETER) {
                    ballsOverlap = true;
                };
            };
        };

        return ballsOverlap;
    };

};