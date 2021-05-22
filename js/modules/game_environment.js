/**
 * Creates and updates the game objects in the game environment.
 */
class GameEnvironment {
    constructor() {

        this.balls = [
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
        ].map(ballSelect => new Ball(ballSelect[0], ballSelect[1]));

        this.cueBall = this.balls[this.balls.length - 1];

        this.stick = new Stick(
            new Vector(413, 413),
            this.cueBall.onStrike.bind(this.cueBall)
        );

        this.table = {
            topY: 57,
            rightX: 1443,
            bottomY: 768,
            leftX: 57
        }; 

    };

    /**
     * Checks Collisions between balls.
     */
    checkCollisions = () => {

        for (let i = 0; i < this.balls.length; i++) {
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