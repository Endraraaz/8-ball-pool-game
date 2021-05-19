handleMouseMove = (event) => {
    let x = event.pageX;
    let y = event.pageY;

    mouse.position = new Vector(x, y);

};

handleMouseDown = (event) => {

    handleMouseMove(event);

    if (event.which === 1) {
        if (!mouse.leftButton.down) {
            mouse.leftButton.pressed = true;
        };
        mouse.leftButton.down = true;
    } else if (event.which === 2) {
        if (!mouse.middleButton.down) {
            mouse.middleButton.pressed = true;
        };
        mouse.middleButton.down = true;
    } else if (event.which === 3) {
        if (!mouse.rightButton.down) {
            mouse.rightButton.pressed = true;
        };
        mouse.rightButton.down = true;
    };

};

handleMouseUp = (event) => {

    handleMouseMove(event);

    if (event.which === 1) {
        mouse.leftButton.down = false;
    } else if (event.which === 2) {
        mouse.middleButton.down = false;
    } else if (event.which === 3) {
        mouse.rightButton.down = false;
    };

};

class MouseHandler {
    constructor() {
        this.leftButton = new ButtonState();
        this.middleButton = new ButtonState();
        this.rightButton = new ButtonState();

        this.position = new Vector();

        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
    };

    reset = () => {
        this.leftButton.pressed = false;
        this.middleButton.pressed = false;
        this.rightButton.pressed = false;
    };

};

let mouse = new MouseHandler();