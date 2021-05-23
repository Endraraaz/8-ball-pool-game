/**
 * Class to draw game objects into the canvas.
 */
class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvasContext = this.canvas.getContext('2d');
    };

    clear = () => {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    /**
     * Draws image to canvas.
     * @param {object} image Provides source of image sprite to be drawn.
     * @param {object} position Provides x,y position coordinates of object to be drawn.
     * @param {object} origin Provides x,y origin coordinates of object to be drawn.
     * @param {number} rotation Provides angle of rotation about its origin.
     */
    drawImage = (image, position, origin, rotation = 0) => {

        if (!position) {
            position = new Vector();
        };

        if (!origin) {
            origin = new Vector();
        };

        this.canvasContext.save();
        this.canvasContext.translate(position.x, position.y);
        this.canvasContext.rotate(rotation);
        this.canvasContext.drawImage(image, -origin.x, -origin.y);
        this.canvasContext.restore();

    };
};

let canvas = new Canvas();

