class GameEnvironment {
    constructor() {

        this.balls = [
            [new Vector(1022, 413), COLOR.YELLOW],//1
            [new Vector(1056, 393), COLOR.RED],//2
            [new Vector(1056, 433), COLOR.YELLOW],//3
            [new Vector(1090, 374), COLOR.RED],//4
            [new Vector(1090, 413), COLOR.BLACK],//5
            [new Vector(1090, 452), COLOR.RED],//6
            [new Vector(1126, 354), COLOR.YELLOW],//7
            [new Vector(1126, 393), COLOR.YELLOW],//8
            [new Vector(1126, 433), COLOR.RED],//9
            [new Vector(1126, 472), COLOR.YELLOW],//10
            [new Vector(1162, 335), COLOR.RED],//11
            [new Vector(1162, 374), COLOR.YELLOW],//12
            [new Vector(1162, 413), COLOR.RED],//13
            [new Vector(1162, 452), COLOR.YELLOW],//14
            [new Vector(1162, 491), COLOR.RED],//15
            [new Vector(413, 413), COLOR.WHITE],//16
        ].map(ballSelect => new Ball(ballSelect[0], ballSelect[1]));

        this.cueBall = this.balls[this.balls.length - 1];
        this.stick = new Stick(
            new Vector(413, 413),
            this.cueBall.strike.bind(this.cueBall)
        );
    };


    update = () => {
        this.stick.update();
        // this.cueBall.update(DELTA);
        this.balls.forEach(ballSelect => {
            ballSelect.update(DELTA);
        });

        if (!this.ballsMoving() && this.stick.striked) {
            this.stick.reposition(this.cueBall.position);
        };
    };

    draw = () => {
        canvas.drawImage(sprites.background, { x: 0, y: 0 });

        this.stick.draw();
        // this.cueBall.draw();
        this.balls.forEach(ballSelect => {
            ballSelect.draw();
        });
    };

    ballsMoving = () => {

        return this.cueBall.moving;
    };

};