class Stick {
    constructor(position, onStrike) {
        // this.position;
        // this.position = new Vector(400, 400);
        this.position = position;
        // this.origin = new Vector(500, 10);
        this.rotation = 0;

        this.origin = STICK_ORIGIN.copy();
        this.power = 0;
        this.onStrike = onStrike;
        this.striked = false;
    };

    update = () => {

        if(mouse.leftButton.down){
            this.increasePower();
        }else if(this.power > 0){
            this.strike();
        };
        // testing mouse control
        // this.position = mouse.position;
        this.updateRotation();
    };

    draw = () => {
        // canvas.drawImage(sprites.stick, this.position, this.origin);
        canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    };

    updateRotation = () => {
        let oppositePosition = mouse.position.y - this.position.y;
        let adjacentPosition = mouse.position.x - this.position.x;

        this.rotation = Math.atan2(oppositePosition, adjacentPosition);
    };

    increasePower = () => {
        this.power += 100;
        this.origin.x += 5;
    };

    strike = () => {

        this.onStrike(this.power, this.rotation);
        this.power = 0;
        this.origin = STICK_STRIKE_ORIGIN.copy();
        this.striked = true;
    };

    reposition = (position) => {
        this.position = position.copy();
        this.origin = STICK_ORIGIN.copy();
    };

};