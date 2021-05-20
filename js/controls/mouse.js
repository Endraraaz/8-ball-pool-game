/**
 * Obtains coordinates of mouse pointer and sets value of position on instance of MouseController
 */
controlMouseMove = (event) => {
    let x = event.pageX;
    let y = event.pageY;

    mouse.position = new Vector(x, y);

};

/**
 * Sets mouse button state to pressed.
 */
controlMouseDown = (event) => {

    controlMouseMove(event);

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

/**
 * Sets mouse button state to released.
 */
controlMouseUp = (event) => {

    controlMouseMove(event);

    if (event.which === 1) {
        mouse.leftButton.down = false;
    } else if (event.which === 2) {
        mouse.middleButton.down = false;
    } else if (event.which === 3) {
        mouse.rightButton.down = false;
    };

};


/**
 * Sets and resets Mouse button state.
 */
class MouseController {
    constructor() {
        this.leftButton = new ButtonState();
        this.middleButton = new ButtonState();
        this.rightButton = new ButtonState();

        this.position = new Vector();

        document.onmousemove = controlMouseMove;
        document.onmousedown = controlMouseDown;
        document.onmouseup = controlMouseUp;
    };

    /**
     * Resets button state when button is released after pressing.
     */
    reset = () => {
        this.leftButton.pressed = false;
        this.middleButton.pressed = false;
        this.rightButton.pressed = false;
    };

};

let mouse = new MouseController();