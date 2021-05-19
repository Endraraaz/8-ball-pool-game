class Ball {
    constructor(position, color){
        this.position = position;

        this.velocity = new Vector();

        this.moving = false;
        this.sprite = getBallSpritesByColor(color);
    };

    update = (delta) => {

        this.position.addTo(this.velocity.multiply(delta));

        this.velocity = this.velocity.multiply(GRAVITY);

        if(this.velocity.length() < 5) {
            this.velocity = new Vector();
            this.moving = false;
        };

    };

    draw = () => {
        canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    };

    // strike test
    strike = (power, rotation) => {
        this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
        this.moving = true;
    };

};