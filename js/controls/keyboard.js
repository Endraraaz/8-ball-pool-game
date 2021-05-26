/**
 * Sets key state to pressed.
 */
controlKeyDown = (event) => {
    let code = event.keyCode;

    if (code < 0 || code > 255) {

        return;
    };

    if (!keyboard.keyStates[code].down) {
        keyboard.keyStates[code].pressed = true;
    };

    keyboard.keyStates[code].down = true;
};

/**
 * Sets key state to released.
 */
controlKeyUp = (event) => {
    let code = event.keyCode;

    if (code < 0 || code > 255) {

        return;
    };

    keyboard.keyStates[code].down = false;
};

/**
 * Provides key pressed event.
 */
class Keyboard {
    constructor() {
        this.keyStates = [];

        for (let i = 0; i < 256; ++i) {
            this.keyStates.push(new ButtonState());
        };

        document.onkeydown = controlKeyDown;
        document.onkeyup = controlKeyUp;
    };

    /**
     * Resets key state after event has occurred.
     */
    reset = () => {
        for (let i = 0; i < 256; ++i) {
            this.keyStates[i].pressed = false;
        };
    };

    /**
     * @param {object} key Provides ASCII value of key pressed.
     * @returns key value and its state as pressed.
     */
    pressed = (key) => {

        return this.keyStates[key].pressed;
    };

    /**
     * @param {object} key Provides ASCII value of key down.
     * @returns key value and sets its state to pressed.
     */
    down = (key) => {

        return this.keyStates[key].down;
    };

};

let keyboard = new Keyboard();