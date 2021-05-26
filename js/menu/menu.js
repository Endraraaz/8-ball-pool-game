/**
 * Initializes the Menu of the Game.
 */
class Menu {
    /**
     * @param {object} backgroundSprite Provides image sprites of menu.
     * @param {Array} labels Provides title to the menu.
     * @param {Array} buttons Provides array of menu buttons.
     */
    init = (backgroundSprite, labels, buttons) => {
        this.background = backgroundSprite;
        this.labels = labels || [];
        this.buttons = buttons || [];
        this.active = false;
    };

    /**
     * Loads the menu to canvas and sets menu status as active.
     */
    load = () => {

        this.active = true;

        requestAnimationFrame(this.menuLoop);
    };

    /**
     * Draws menu background, buttons and labels to canvas.
     */
    draw = () => {
        canvas.canvas.style.cursor = "auto";

        canvas.drawImage(this.background, new Vector(), new Vector());

        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].draw();
        };

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        };
    };

    /**
     * Controls mouse pointer movement and calls button action function on clicking the button.
     */
    controlMousePointer = () => {

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].controlButtonClick();
        };

    };

    /**
     * Controls main menu engine.
     */
    menuLoop = () => {

        if (this.active) {
            this.controlMousePointer();
            canvas.clear();
            this.draw();
            mouse.reset();

            requestAnimationFrame(this.menuLoop);
        };
    };

};