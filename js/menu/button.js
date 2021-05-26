/**
 * Defines properties and actions of menu buttons.
 */
class Button {
    /**
     * @param {object} sprite Provides sprite image of menu button.
     * @param {object} position Provides position of menu button to be displayed.
     * @param callback  Provides callback function which is called on button click action.
     * @param {object} hoverSprite Provides sprite image of menu button for hover effect.
     */
    constructor(sprite, position, callback, hoverSprite) {
        this.sprite = sprite;
        this.hoverSprite = hoverSprite ? hoverSprite : sprite;
        this.position = position;
        this.callback = callback;
    };

    /**
     * Draws buttons to menu. 
     */
    draw = () => {

        if (this.mouseInsideBorders()) {
            canvas.drawImage(this.hoverSprite, this.position);
            canvas.canvas.style.cursor = "pointer";
        } else {
            canvas.drawImage(this.sprite, this.position);
        };
    };

    /**
     * Executes callback function on button click.
     */
    controlButtonClick = () => {

        if (mouse.leftButton.down && this.mouseInsideBorders()) {
            this.callback();
        };
    };

    /**
     * Checks mouse pointer inside borders of menu button. 
     * @returns boolean value after checking the conditions.
     */
    mouseInsideBorders = () => {

        let mousePosition = mouse.position;

        if (mousePosition.x > this.position.x &&
            mousePosition.x < this.position.x + this.sprite.width &&
            mousePosition.y > this.position.y &&
            mousePosition.y < this.position.y + this.sprite.height){

                return true;
            };

        return false;
    };

};