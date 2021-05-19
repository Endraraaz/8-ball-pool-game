class GameEnvironment {
    constructor() {
        this.cueBall = new Ball(new Vector(413, 413), COLOR.RED);
        // this.stick = new Stick();
        this.stick = new Stick(
            new Vector(413, 413),
            this.cueBall.strike.bind(this.cueBall)
            );
    };

    
    update = () => {
        this.stick.update();
        this.cueBall.update(DELTA);

        if(!this.ballsMoving() && this.stick.striked){
            this.stick.reposition(this.cueBall.position);
        };
    };

    draw = () => {
        canvas.drawImage(sprites.background, { x: 0, y: 0 });

        this.stick.draw();
        this.cueBall.draw();
    };

    ballsMoving = () => {

        return this.cueBall.moving;
    };

};